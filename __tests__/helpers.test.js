const {format_date, format_plural, format_url} = require("../utils/helper");    

test("format_date() returns a date string", () => {
  const date = new Date("2020-03-20 16:12:03");

  expect(format_date(date)).toBe("3/20/2020");
});

test("format_plural() returns pluralized words", () => {
  const word = "Tiger";

  expect(format_plural(word)).toBe("Tigers");
});

test("format_url() returns a shortened URL", () => {
    const url1 = format_url("http://test.com/page/1");
    const url2 = format_url("www.google.com?q=hello");
    const url3 = format_url("https://www.zara.com/sdnjnfi");

expect(format_url(url1)).toBe('test.com');
expect(format_url(url2)).toBe('google.com');
expect(format_url(url3)).toBe('zara.com');
});
