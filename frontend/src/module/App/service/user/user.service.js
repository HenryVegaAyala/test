import { requestService } from "@/mixins/request";

export const userService = {
  usersAll,
  usersUpdate
};

function usersAll() {
  return requestService.get("users");
}

function usersUpdate(id, attributes) {
  return requestService.put("users/" + id, attributes);
}
