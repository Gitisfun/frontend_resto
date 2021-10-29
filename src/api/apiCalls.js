import { successMessage, errorMessage } from "../logic/notifications/messages";

function getById(requestHandler, id, responseHandler, context) {
  requestHandler(id)
    .then((res) => responseHandler(res))
    .catch((err) => {
      if (err) {
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}

function getByIdWithParams(requestHandler, id, queryString, responseHandler, context) {
  requestHandler(id, queryString)
    .then((res) => responseHandler(res))
    .catch((err) => {
      if (err) {
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}

function getAll(requestHandler, queryString, responseHandler, context) {
  requestHandler(queryString)
    .then((res) => responseHandler(res))
    .catch((err) => {
      if (err) {
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}

function getAllSearch(requestHandler, search, responseHandler, context) {
  requestHandler(search)
    .then((res) => responseHandler(res))
    .catch((err) => {
      if (err) {
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}

function getMultiple(requestList, responseHandler, context) {
  Promise.all(requestList)
    .then((res) => responseHandler(res))
    .catch((err) => {
      if (err) {
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}
function getMultipleWithLoading(requestList, responseHandler, context, isLoading) {
  Promise.all(requestList)
    .then((res) => {
      isLoading = false;
      responseHandler(res);
    })
    .catch((err) => {
      if (err) {
        isLoading = false;
        console.log(isLoading);
        errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
      }
    });
}

function create(requestHandler, body, context, back) {
  requestHandler(body)
    .then((res) => {
      if (res) {
        successMessage("Succesvol toegevoegd", context);
        if (back) {
          context.$router.go(-1);
        }
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden toegevoegd, er ging iets fout op de server", context);
      }
    });
}

function createMultiple(requestHandler, body, requestHandlerList, callback) {
  requestHandler(body)
    .then((res1) => {
      if (res1) {
        return res1;
      }
    })
    .then((res2) => {
      for (let i = 0; i < body.list.length; i++) {
        body.list[i].order_nr = res2.data.insertId;
      }
      localStorage.setItem("tempItemId", res2.data.insertId)
      return body.list;
    })
    .then((res3) => {
      return requestHandlerList(res3);
    })
    .then((res4) => {
      if (res4) {
        callback();
      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}

function createMulitpleMenu(requestHandler, body, requestHandlerList, context) {
  requestHandler(body)
    .then((res1) => {
      if (res1) {
        for (let i = 0; i < body.menu_items.length; i++) {
          body.menu_items[i].menu_id = res1.data.insertId;
        }
        return body.menu_items;
      }
    })
    .then((res2) => {
      return requestHandlerList(res2);
    })
    .then((res3) => {
      if (res3) {
        successMessage("Succesvol toegevoegd", context);
        context.$router.go(-1);
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden toegevoegd, er ging iets fout op de server", context);
      }
    });
}

function updateMulitpleMenu(deleteRequestHandler, requestHandler, body, requestHandlerList, context, callbackAction) {
  deleteRequestHandler(body.id)
    .then((res0) => {
      if (res0) {
        return requestHandler(body);
      }
    })
    .then((res1) => {
      if (res1) {
        for (let i = 0; i < body.menu_items.length; i++) {
          body.menu_items[i].menu_id = res1.data.insertId;
        }
        return body.menu_items;
      }
    })
    .then((res2) => {
      return requestHandlerList(res2);
    })
    .then((res3) => {
      if (res3) {
        successMessage("Succesvol toegevoegd", context);
        callbackAction()
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden gewijzigd, er ging iets fout op de server", context);
      }
    });
}

function update(requestHandler, body, context, back) {
  requestHandler(body.id, body)
    .then((res) => {
      if (res) {
        successMessage("Succesvol gewijzigd", context);
        if (back) {
          context.$router.go(-1);
        }
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden gewijzigd, er ging iets fout op de server", context);
      }
    });
}

function updateWithCallback(requestHandler, body, context, back) {
  requestHandler(body.id, body)
    .then((res) => {
      if (res) {
        successMessage("Succesvol gewijzigd", context);
        back();
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden gewijzigd, er ging iets fout op de server", context);
      }
    });
}

function deleteById(requestHandler, id, context, back) {
  requestHandler(id)
    .then((res) => {
      if (res) {
        successMessage("Succesvol verwijderd", context);
        if (back) {
          context.$router.go(-1);
        }
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden verwijderd, er ging iets fout op de server", context);
      }
    });
}

function deleteWithCallback(requestHandler, id, context, back) {
  requestHandler(id)
    .then((res) => {
      if (res) {
        successMessage("Succesvol verwijderd", context);
        back();
      }
    })
    .catch((err) => {
      if (err) {
        errorMessage("Kon niet worden verwijderd, er ging iets fout op de server", context);
      }
    });
}

function apiCall(requestHandler, responseHandler, errorHandler) {
  requestHandler()
    .then((res) => responseHandler(res))
    .catch((err) => errorHandler(err));
}

export { getById, getByIdWithParams, getAll, getAllSearch, getMultiple, getMultipleWithLoading, create, createMultiple, createMulitpleMenu, updateMulitpleMenu, update, updateWithCallback, deleteById, deleteWithCallback, apiCall };
