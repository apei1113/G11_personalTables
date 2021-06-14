const { render } = require('ejs');
const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM g11_subject ORDER BY Name desc');
    data = rows;
    // res.json(data);
    res.render('subjects', { data });
  } catch (err) {
    console.log('Errors on getting subjects!');
    res.render('subjects', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')
  res.render('subjects/add', {
    Name: '',
    Code: '',
    professor: '',
    teaching_assistant: '',
    Department_of_Courses: '',
    credits: '',
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.')

  const Name = req.body.Name;
  const Code = req.body.Code;
  const professor = req.body.professor;
  const teaching_assistant = req.body.teaching_assistant;
  const Department_of_Courses = req.body.Department_of_Courses;
  const credits = req.body.credits;

  // console.log(name, author);
  console.log(Name, Code, professor, teaching_assistant, Department_of_Courses, credits);

  const form_data = {
    Name: Name,
    Code: Code,
    professor: professor,
    teaching_assistant: teaching_assistant,
    Department_of_Courses: Department_of_Courses,
    credits: credits,
  };
  
  try {
    await db.query('INSERT INTO g11_subject SET ?', form_data);
    res.redirect('/subjects');
  } catch(err) {
    console.log(err);
    res.render('subjects/add', {
      Name: form_data.Name,
      Code: form_data.Code,
      professor: form_data.professor,
      teaching_assistant: form_data.teaching_assistant,
      Department_of_Courses: form_data.Department_of_Courses,
      credits: form_data.credits,
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  // res.send('display edit book page');
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM g11_subject WHERE id = ?', [id]);
    res.render('subjects/edit', {
      id: rows[0].id,
      Name: rows[0].Name,
      Code: rows[0].Code,
      professor: rows[0].professor,
      teaching_assistant: rows[0].teaching_assistant,
      Department_of_Courses: rows[0].Department_of_Courses,
      credits: rows[0].credits
    });
  } catch(err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  const Name = req.body.Name;
  const Code = req.body.Code;
  const professor = req.body.professor;
  const teaching_assistant = req.body.teaching_assistant;
  const Department_of_Courses = req.body.Department_of_Courses;
  const credits = req.body.credits;
  const id = req.body.id;

  try {
      await db.query('UPDATE g11_subject SET Name = ?, Code = ?, professor = ?, teaching_assistant = ?, Department_of_Courses = ?, credits = ? WHERE id = ?',[
        Name,
        Code,
        professor,
        teaching_assistant,
        Department_of_Courses,
        credits,
        id,
    ]);
    // res.status(200).json({ message: 'Updating successful' });
    res.redirect('/subjects');
  } catch(err){
    console.log(err);
  }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
// router.get('/delete/:ClassName', async function (req, res, next) {
  let id = req.params.id;
  // let ClassName = req.params.ClassName;

  try {
    await db.query('DELETE FROM g11_subject WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/subjects');
});

module.exports = router;
