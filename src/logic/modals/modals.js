// General
function showYesOrNoModal(context, modal, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      confirmation: (value) => {
        action(value);
      },
    },
  });
}

function showSaveModal(context, modal, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      save: (value) => {
        action(value);
      },
    },
  });
}

function showUpdateModal(context, modal, passedObj, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    props: { obj: passedObj },
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      save: (value) => {
        action(value);
      },
    },
  });
}

// Menu
function showMenuTitleModal(context, modal, title, type, passedObj, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    props: { obj: passedObj, title: title, type: type },
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      addMenuTitle: (value) => {
        action(value);
      },
      back: () => {
        context.$router.go(-1);
      },
    },
  });
}

function showAddSubmenuModal(context, modal, title, passedObj, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    props: { obj: passedObj, title: title },
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      addSubmenu: (value) => {
        action(value);
      },
    },
  });
}

function showAddMenuItemModal(context, modal, title, passedObj, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    props: { obj: passedObj, title: title },
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: false,
    events: {
      addMenuItem: (value) => {
        action(value);
      },
    },
  });
}

function showOrderDetailsModal(context, modal, passedObj, isInfo, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    props: { obj: passedObj, isInfo: isInfo, router: context.$router },
    hasModalCard: false,
    trapFocus: true,
    canCancel: true,
    fullScreen: false,
    events: {
      notify: (value) => {
        action(value);
      },
    },
  });
}

function showTimeslotModal(context, modal, action) {
  context.$buefy.modal.open({
    parent: this,
    component: modal,
    hasModalCard: false,
    trapFocus: true,
    canCancel: false,
    fullScreen: true,
    events: {
      close: () => {
        action();
      },
    },
  });
}

export { showYesOrNoModal, showSaveModal, showUpdateModal, showMenuTitleModal, showAddSubmenuModal, showAddMenuItemModal, showOrderDetailsModal, showTimeslotModal };
