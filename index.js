const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contactsOperation = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperation.listContacts();
      console.log("\x1b[32m Contact list \n \x1b[0m");
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperation.getContactById(id);
      if(!contact){
        throw new Error(`Contact with id=${id} not found`)
      }
      console.log("\x1b[32m Contact by id \n \x1b[0m");
      console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperation.addContact(name, email, phone);
      console.log("\x1b[32m New contact \n \x1b[0m");
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperation.removeContact(id);
      console.log("\x1b[32m Remove contact \n \x1b[0m");
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
}

console.log("\n \x1b[35m ==> -- Next start -- <== \n \x1b[0m");

(async () => {
    invokeAction(argv);
  })();
  

