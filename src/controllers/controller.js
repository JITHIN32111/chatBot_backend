import Message from '../models/messageModel.js';



  export const getDataFromDb = async (req, res) => {
    try {
      const data = await Message.find().sort({ _id: -1 }).limit(10);
      return res.status(201).json({
        data
    });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const generateHTML = (data) => {
    const items = data.map(item => `<li>${item.someProperty}</li>`).join('');
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Data Page</title>
        </head>
        <body>
            <h1>Data from Server</h1>
            <ul>${items}</ul>
        </body>
        </html>
    `;
};