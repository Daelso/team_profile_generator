 
const Intern = require('../lib/Intern');



// gets school from getSchool()
test('checks if the school is a valid answer', () => {
    const intern = new Intern('Chase', 14, 'cmurtau@g.clemson.edu', 'Clemson');

    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// gets role from getRole() 
test('gets role of employee', () => {
    const intern = new Intern('Chase', 14, 'cmurtau@g.clemson.edu', 'Clemson');

    expect(intern.getRole()).toEqual("Intern");
});