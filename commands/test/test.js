module.exports = {
    name: "test",
    category: "test",
    description: "comando de prueba",
    run: (client, message, args) => {
        message.channel.send("comando test")
    }
}
