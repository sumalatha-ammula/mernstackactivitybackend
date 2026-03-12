import { jest } from "@jest/globals";

/* Mock Contact Model */
jest.unstable_mockModule("../models/contact.js", () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

/* Import after mocking */
const Contact = (await import("../models/contact.js")).default;

const {
  addContact,
  getContacts,
  updateContact,
  deleteContact
} = await import("../controllers/contactcontoller.js");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Contact Controller Tests", () => {

  test("should create a contact", async () => {

    const req = {
      body: {
        name: "John",
        email: "john@test.com",
        phone: "1234567890",
        company: "ABC",
        status: "Lead",
        notes: "Test note"
      }
    };

    const res = mockResponse();

    Contact.create.mockResolvedValue(req.body);

    await addContact(req, res);

    expect(Contact.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });


  /* GET CONTACTS */
  test("get contacts", async () => {

    const req = {
      query: { page: "1", limit: "5" }
    };

    const res = mockResponse();

    const mockContacts = [{ name: "John" }];

    Contact.find.mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockContacts)
        })
      })
    });

    Contact.countDocuments.mockResolvedValue(1);

    await getContacts(req, res);

    expect(Contact.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });


  /* UPDATE CONTACT */
  test("should update contact", async () => {

    const req = {
      params: { id: "123" },
      body: { name: "Updated Name" }
    };

    const res = mockResponse();

    Contact.findByIdAndUpdate.mockResolvedValue({
      name: "Updated Name"
    });

    await updateContact(req, res);

    expect(Contact.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });


  /* DELETE CONTACT */
  test("should delete contact", async () => {

    const req = {
      params: { id: "123" }
    };

    const res = mockResponse();

    Contact.findByIdAndDelete.mockResolvedValue({
      _id: "123"
    });

    await deleteContact(req, res);

    expect(Contact.findByIdAndDelete).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

});