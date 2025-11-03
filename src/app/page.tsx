const HomePage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-background-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-secondary sm:text-5xl md:text-6xl">
            Transforma Visitantes en Clientes Calificados
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-secondary sm:text-xl md:mt-5 md:max-w-3xl">
            Nuestra plataforma utiliza inteligencia artificial para automatizar la captación y cualificación de leads, permitiéndote centrarte en lo que realmente importa: cerrar ventas.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
              >
                Habla con nuestro Asistente
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Características
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-secondary sm:text-4xl">
              Todo lo que necesitas para crecer
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Botify te ofrece un conjunto de herramientas diseñadas para optimizar tu embudo de ventas y mejorar la interacción con tus clientes.
            </p>
          </div>

          <div className="mt-10">
            {/* Placeholder for features list */}
            <p className="text-center text-gray-500">
              [Aquí se mostrará una lista detallada de las características del servicio.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
