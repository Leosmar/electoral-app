export default function filterText() {
  function tokenize(input) {
    return input
      .toLowerCase()
      .replace(/[^a-z0-9_\s]/g, "")
      .split(/\s+/g);
  }

  function remove_suffix(token) {
    return token.replace(/(ing|s)$/, "");
  }

  function get_keywords(query) {
    var tokens = tokenize(query);
    var keywords = tokens.map(remove_suffix);
    keywords.sort();

    return keywords;
  }

  console.log(get_keywords(""));

  return;
}
