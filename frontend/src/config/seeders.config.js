class Seeder {
  constructor() {}

  statusSeeder() {
    return [
      { text: "Activo", value: "1" },
      { text: "Inactivo", value: "0" }
    ];
  }
}
export const seederConfig = new Seeder();
