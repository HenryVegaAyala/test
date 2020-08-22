<template>
  <a-config-provider :locale="esES">
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div class="content">
          <a-table
            :columns="columns"
            :data-source="data"
            :loading="{ spinning: loading, tip: 'Cargando...' }"
            size="middle"
            bordered
            rowKey="id"
            :scrollToFirstRowOnChange="true"
            :defaultExpandAllRows="true"
            :pagination="{
              showSizeChanger: true,
              showLessItems: true,
              showQuickJumper: false,
              hideOnSinglePage: false,
              pageSize: pageSize,
              showTotal: total => `Total ${total} usuarios`,
              pageSizeOptions: ['10', '30', '50']
            }"
            @change="paginate"
          >
            <template slot="filterIcon">
              <a-icon
                type="funnel-plot"
                :style="{
                  fontSize: '17px',
                  color: '#108ee9'
                }"
              />
            </template>

            <template slot="stateRender" slot-scope="text, record">
              <div v-if="record.editable === undefined">
                <a-tag :color="text === '0' ? 'red' : 'blue'">
                  {{ text === "1" ? "Activo" : "Inactivo" }}
                </a-tag>
              </div>
              <div v-else>
                <a-select
                  :default-value="text"
                  style="width: 50%"
                  @change="e => handleChange(e, record.id)"
                >
                  <a-select-option value="1">
                    Activo
                  </a-select-option>
                  <a-select-option value="0">
                    Inactivo
                  </a-select-option>
                </a-select>
              </div>
            </template>

            <template slot="operationRender" slot-scope="text, record">
              <div v-if="record.editable === undefined">
                <a @click="activeEditRow(text)" :disabled="editingKey !== ''">
                  Editar
                </a>
              </div>
              <div v-else>
                <a @click="save(text)">Guardar</a>
                <a-divider type="vertical" />
                <a @click="cancel(text)">Cancelar</a>
              </div>
            </template>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script>
// eslint-disable-next-line
import { Table, Layout, ConfigProvider, Tag, Select, Divider } from "ant-design-vue";
import esES from "ant-design-vue/es/locale-provider/es_ES";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { seederConfig } from "@/config/seeders.config";

export default {
  name: "users",
  comments: {
    "a-layout": Layout,
    "a-layout-content": Layout.Content,
    "a-layout-footer": Layout.Footer,
    "a-table": Table,
    "a-config-provider": ConfigProvider,
    "a-tag": Tag,
    "a-select": Select,
    "a-select-option": Select.Option,
    "a-divider": Divider
  },
  data() {
    return {
      columns: [],
      pageSize: 10,
      loading: false,
      esES,
      editingKey: "",
      cacheData: []
    };
  },
  beforeMount() {
    this.loadingState(true);
    this.getAllInvoiced();
  },
  mounted() {
    this.cacheData = this.data.map(item => ({ ...item }));
  },
  methods: {
    ...mapActions("userStore", ["usersAllActions", "usersUpdateActions"]),
    ...mapGetters("userStore", ["usersAllGetters"]),
    ...mapMutations("userStore", ["usersAllMutations"]),
    loadingState(response) {
      this.loading = response;
    },
    getAllInvoiced() {
      // eslint-disable-next-line
      this.usersAllActions().then(response => {
        if (response.success === true) {
          this.setColumnsTable(response.data);
          this.loadingState(false);
        }
      });
    },
    setColumnsTable() {
      this.columns = [
        {
          title: "Usuario",
          dataIndex: "name",
          key: "name",
          width: "35%"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: "35%",
          align: "left"
        },
        {
          title: "Estado",
          dataIndex: "state",
          key: "state",
          width: "20%",
          align: "center",
          scopedSlots: {
            filterIcon: "filterIcon",
            customRender: "stateRender"
          },
          filters: seederConfig.statusSeeder(),
          filterMultiple: false,
          onFilter: (value, record) => record.state.indexOf(value) === 0
        },
        {
          title: "Operación",
          dataIndex: "id",
          key: "operation",
          width: "10%",
          align: "center",
          scopedSlots: {
            customRender: "operationRender"
          }
        }
      ];
    },
    paginate(pagination) {
      this.loadingState(true);
      setTimeout(() => {
        this.loadingState(false);
        this.pageSize = pagination.pageSize;
      }, 500);
    },
    handleChange(value, key) {
      const newData = [...this.usersAllGetters()];
      const target = newData.filter(item => key === item.id)[0];
      if (target) {
        target["state"] = value;
        this.usersAllMutations(newData);
      }
    },
    activeEditRow(key) {
      const response = [...this.usersAllGetters()];
      const target = response.filter(item => key === item.id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
      }

      this.usersAllMutations(response);
    },
    cancel(key) {
      const newData = [...this.usersAllGetters()];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.id)[0]
        );
        delete target.editable;
        this.usersAllMutations(newData);
      }
    },
    save(key) {
      const newData = [...this.usersAllGetters()];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.id)[0];
      const targetCache = newCacheData.filter(item => key === item.id)[0];
      if (target && targetCache) {
        delete target.editable;
        this.usersAllMutations(newData);
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;

        let payload = { id: key, attributes: target.state };
        this.usersUpdateActions(payload);
      } else {
        this.cancel(key);
      }
      this.editingKey = "";
    }
  },
  watch: {},
  computed: {
    ...mapState("userStore", ["usersAllState"]),
    data() {
      return this.usersAllState;
    }
  }
};
</script>

<style type="text/css">
.content {
  padding: 24px;
  background: #fff;
  height: 100%;
}
</style>
