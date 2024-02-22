const { sortDictVal } = require("./report.js");

const linksDict = {
  link1: 4,
  link2: 1,
  link3: 3,
  link4: 2,
};

test("Links are sorted by value", () => {
  expect(sortDictVal(linksDict)).toStrictEqual([
    "link1",
    "link3",
    "link4",
    "link2",
  ]);
});
