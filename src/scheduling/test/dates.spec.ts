describe('Dates', () => {
  it('should print a date', () => {
    const iosDate = new Date().toISOString();
    const dateOnly = new Date(iosDate).toDateString();
    console.log(dateOnly);
  });
});
