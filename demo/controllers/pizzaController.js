const Pizza = require("../models/Pizza");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.create = async (req, res) => {
  const { name, currency, prices, img, description, slug } = req.body;

  console.log(req.body);

  // STRIPE
  // A. PRODUCTO
  // CREAR EL PRODUCTO EN STRIPE
  try {
    const product = await stripe.products.create({
      name,
      description,
      images: [...img],
      metadata: {
        productDescription: description,
        slug,
      },
    });

    // B. PRECIO
    // CREAR LOS PRECIOS PARA EL PRODUCTO EN STRIPE

    const stripePrices = await Promise.all(
      prices.map(async (e) => {
        return await stripe.prices.create({
          unit_amount: e.price,
          currency: currency,
          product: product.id,
          nickname: e.size,
          metadata: {
            size: e.size,
            priceDescription: e.description,
          },
        });
      })
    );

    // 2. MODIFICACIÓN EN BASE DE DATOS

    const pizzaPrices = stripePrices.map((e) => {
      return {
        id: e.id,
        size: e.metadata.size,
        priceDescription: e.metadata.priceDescription,
        price: e.unit_amount,
      };
    });

    console.log("pizzaPrices", pizzaPrices);

    const newPizza = await Pizza.create({
      idProd: product.id,
      name: product.name,
      prices: [...pizzaPrices],
      img,
      currency,
      description: product.description,
      slug,
    });

    // DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
    res.json({
      msg: "Pizza creada con éxito",
      data: newPizza,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error creando la pizza",
      error: error.message
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});

    res.json({
      msg: "Pizzas obtenidas con éxito.",
      data: pizzas,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    });
  }
};

exports.readOne = async (req, res) => {
  const { slug } = req.params;

  try {
    const pizza = await Pizza.findOne({ slug });

    if (pizza === null) {
      return res.status(400).json({
        msg: "Pizza no encontrada.",
      });
    }

    res.json({
      msg: "Pizza obtenida con éxito.",
      data: pizza,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "hubo un error obteniendo los datos.",
      error: error,
    });
  }
};

// Actualizar un producto
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPizza = await Pizza.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPizza) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado con éxito",
      product: updatedPizza,
    });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error });
  }
};


// Eliminar un producto
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPizza = await Pizza.findByIdAndDelete(id);

    if (!deletedPizza) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto eliminado con éxito",
      product: deletedPizza,
    });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el producto", error });
  }
};
