import Contact from "../models/contact.js";
export const addContact = async (req, res) => {
  try {

    const { name, email, phone, company, status, notes } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      status,
      notes
    });

    res.status(200).json({
      message: "Contact created successfully",
      contact
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getContacts = async (req, res) => {

//   try {

//     const contacts = await Contact.find();

//     res.json(contacts);

//   } catch (error) {

//     res.status(500).json({ message: error.message });

//   }

// };
export const getContacts = async (req, res) => {

try {

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 5

const skip = (page - 1) * limit

const contacts = await Contact
.find()
.skip(skip)
.limit(limit)
.sort({ createdAt: -1 })

const total = await Contact.countDocuments()

res.json({
contacts,
total,
page,
pages: Math.ceil(total / limit)
})

} catch (error) {

res.status(500).json({
message: error.message
})

}

}
export const updateContact = async (req, res) => {

  try {

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.json({
      message: "Contact updated",
      contact
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const deleteContact = async (req, res) => {

  try {

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.json({
      message: "Contact deleted"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};