module.exports = {
    // Indica a Jest que archivos de prueba buscar y qué extensiones considerar.
    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],

    // Configura el entorno de prueba, en este caso, jsdom es común para pruebas en React.
    testEnvironment: "jsdom",

};
