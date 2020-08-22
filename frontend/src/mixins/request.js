import queryString from "querystring";

class request {
  constructor() {}

  get(path, parameters) {
    const params = queryString.stringify(parameters);
    const target = path + (params !== "" ? "?" + params : params);
    let requestOptions = {
      method: "GET",
      headers: this.authHeader()
    };

    return this.request("get", target, requestOptions);
  }

  post(path, data) {
    const target = path;
    let requestOptions = {
      method: "POST",
      headers: this.authHeader(),
      body: JSON.stringify(data)
    };

    return this.request("post", target, requestOptions);
  }

  delete(path, data) {
    const target = path;
    let requestOptions = {
      method: "DELETE",
      headers: this.authHeader(),
      body: JSON.stringify(data)
    };

    return this.request("delete", target, requestOptions);
  }

  put(path, data) {
    const target = path;
    let requestOptions = {
      method: "PUT",
      headers: this.authHeader(),
      body: JSON.stringify(data)
    };

    return this.request("put", target, requestOptions);
  }

  authHeader() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: ""
    };
  }

  request(method, path, options) {
    const target = process.env.VUE_APP_BASE_URL + path;
    return fetch(target, options)
      .then(response => response.json())
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  }
}

export const requestService = new request();
