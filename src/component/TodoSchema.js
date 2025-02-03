import Joi from "joi"; // Import Joi

export const validateTodo = (todo) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      "string.base": `"Title" should be a type of 'text'`,
      "string.empty": `"Title" cannot be empty`,
      "string.min": `"Title" should have a minimum length of {#limit}`,
      "any.required": `"Title" is a required field`,
    }),
    desc: Joi.string().min(5).required().messages({
      "string.base": `"Description" should be a type of 'text'`,
      "string.empty": `"Description" cannot be empty`,
      "string.min": `"Description" should have a minimum length of {#limit}`,
      "any.required": `"Description" is a required field`,
    }),
    order: Joi.number().integer().min(1).required().messages({
      "number.base": `"Order" should be a number`,
      "number.min": `"Order" should be at least {#limit}`,
      "any.required": `"Order" is a required field`,
    }),
  });

  return schema.validate(todo, { abortEarly: false });
};
