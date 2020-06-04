const add = (a: number, b: number) => (a + b);

test("Should Add Two Numbers", () => {
    const result = add(3, 4);
    expect(result).toBe(7);
});

const generateGreeting = (name: string = "Anonymous") => (`Hello ${name}!`);

test("Should generate greeting for the name", () => {
    const result = generateGreeting("Mike");
    expect(result).toBe("Hello Mike!");
});

test("Should generate greeting for no name", () => {
    const result = generateGreeting();
    expect(result).toBe("Hello Anonymous!");
});