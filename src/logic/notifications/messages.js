function infoMessage(msg, context) {
    context.$buefy.notification.open({
        duration: 5000,
        message: `<b>${msg}</b>`,
        position: 'is-bottom-right',
        type: 'is-info',
        hasIcon: true
    })
}

function successMessage(msg, context) {
    context.$buefy.notification.open({
        duration: 5000,
        message: `<b>${msg}</b>`,
        position: 'is-bottom-right',
        type: 'is-success',
        hasIcon: true
    })
}

function errorMessage(msg, context) {
    context.$buefy.notification.open({
        duration: 5000,
        message: `<b>${msg}</b>`,
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: true
    })
}

export {infoMessage, successMessage, errorMessage }