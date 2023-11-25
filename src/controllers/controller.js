import Message from '../models/messageModel.js';

export const getDataFromDb =async (req, res) => {
    try {
      const data = await Message.find().sort({ _id: -1 }).limit(10);
       console.log(data)
       const a=data[0]._id          // Function to generate HTML from data
        res.send(a);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
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