const { error } = require("console");
const fs = require("fs");

function getValue(flag) {
  const index = process.argv.indexOf(flag);

  if (index > -1) {
    return process.argv[index + 1];
  } else return null;
}

const comand = getValue("-com");
const title = getValue("-t");
const content = getValue("-con");

switch (comand) {
  case "list":
    readMy((error, notes) => {
      if (error) return console.error(error.message);
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
      });
    });
    break;

  case "viewAll":
    readMy((error, notes) => {
      if (error) return console.error(error.message);

      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title} \n${note.content}`);
      });
    });
    break;

  case "view":
    view(title, (error, note) => {
      if (error) return console.error(error.message);

      console.log(`# ${note.title}\r\n\r\n---\r\n\r\n#${note.content}`);
    });
    break;

  case "create":
    create(title, content, (error) => {
      if (error) return console.error(error.message);

      console.log("Zametka sozdana");
    });
    break;

  case "remove":
    remove(title, (error) => {
      if (error) return console.error(error.message);

      console.log("Zametka ydalena");
    });
    break;

  default:
    console.log("net takoi komandi");
}

function readMy(done) {
  fs.readFile("./notes.json", (error, data) => {
    if (error) return done(error);

    const notes = JSON.parse(data);
    done(null, notes);
  });
}

function view(title, done) {
  fs.readFile("./notes.json", (error, data) => {
    if (error) return done(error);

    const notes = JSON.parse(data);
    const note = notes.find((note) => note.title === title);

    if (!note) return done(new Error("Zametka ne naidena"));

    done(null, note);
  });
}

function create(title, content, done) {
  fs.readFile("./notes.json", (error, data) => {
    if (error) return done(error);

    const notes = JSON.parse(data);
    notes.push({ title, content });
    const json = JSON.stringify(notes);
    fs.writeFile("notes.json", json, (error) => {
      if (error) return done(error);

      done();
    });
  });
}

function remove(title, done) {
  fs.readFile("./notes.json", (error, data) => {
    if (error) return done(error);

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.title !== title);
    const json = JSON.stringify(notes);
    fs.writeFile("notes.json", json, (error) => {
      if (error) return done(error);

      done();
    });
  });
}
