import { CourseRecord, LessonRecord, QuizQuestionRecord } from '../db/indexedDB';

export const INITIAL_COURSES: CourseRecord[] = [
  {
    id: 'python-fundamentals',
    title: 'Python Fundamentals',
    category: 'Computer Science',
    level: 'Beginner',
    description: 'Master core programming concepts, variables, control flow, nested loops, functions, and data structures using Python.',
    totalLessons: 6,
    downloadSizeMB: 1.8,
    isDownloaded: true, // Pre-configured downloaded for seamless demo initial state
    downloadedAt: new Date().toISOString()
  },
  {
    id: 'web-development',
    title: 'Web Development Basics',
    category: 'Computer Science',
    level: 'Beginner',
    description: 'Learn how to build modern responsive websites using HTML5, CSS3, and JavaScript.',
    totalLessons: 5,
    downloadSizeMB: 2.4,
    isDownloaded: false
  },
  {
    id: 'database-management',
    title: 'Database Management Systems',
    category: 'Information Technology',
    level: 'Intermediate',
    description: 'Understand relational databases, SQL queries, table normalization, and primary/foreign keys.',
    totalLessons: 5,
    downloadSizeMB: 2.1,
    isDownloaded: false
  }
];

export const PYTHON_LESSONS: LessonRecord[] = [
  {
    id: 'py-01-intro',
    courseId: 'python-fundamentals',
    order: 1,
    title: '01. Introduction to Python',
    shortDescription: 'Understand what Python is, why it is popular, and write your first print program.',
    contentMarkdown: `
# Introduction to Python

Python is a high-level, interpreted, and easy-to-learn programming language created by Guido van Rossum. It is widely used in web development, data science, artificial intelligence, and automation.

### Key Characteristics:
1. **Simple & Readable:** Python syntax resembles natural English language.
2. **Interpreted:** Code is executed line-by-line, making debugging easy.
3. **Cross-Platform:** Works seamlessly on Windows, Linux, and Android environments.

### Your First Program
To output text in Python, we use the \`print()\` function.
`,
    codeSnippets: [
      {
        title: 'Hello World in Python',
        code: `print("Namaste World!")\nprint("Welcome to Gyaan Saathi!")`,
        output: `Namaste World!\nWelcome to Gyaan Saathi!`
      }
    ],
    keyPoints: [
      'Python uses indentation instead of curly braces for code blocks.',
      'File extensions end with .py',
      'print() is used to display output on screen.'
    ],
    topicTags: ['introduction', 'basics'],
    availableOffline: true
  },
  {
    id: 'py-02-variables',
    courseId: 'python-fundamentals',
    order: 2,
    title: '02. Variables & Data Types',
    shortDescription: 'Learn how to store data using variables, integers, strings, floats, and booleans.',
    contentMarkdown: `
# Variables & Data Types

Variables are containers for storing data values. In Python, you do not need to explicitly declare variable types; Python infers them automatically.

### Basic Data Types:
- **int:** Whole numbers (e.g., \`student_id = 101\`)
- **str:** Sequence of characters in quotes (e.g., \`name = "Rahul"\`)
- **float:** Decimal numbers (e.g., \`marks = 84.5\`)
- **bool:** True or False values (e.g., \`is_enrolled = True\`)
`,
    codeSnippets: [
      {
        title: 'Declaring Variables',
        code: `student_name = "Rahul Kumar"\nage = 19\ngpa = 8.4\nis_passed = True\n\nprint("Student:", student_name)\nprint("Age:", age)\nprint("GPA:", gpa)`,
        output: `Student: Rahul Kumar\nAge: 19\nGPA: 8.4`
      }
    ],
    keyPoints: [
      'Variable names are case-sensitive (name vs Name).',
      'Cannot start with a digit (e.g., 1student is invalid).',
      'Use meaningful snake_case names.'
    ],
    topicTags: ['variables', 'data-types'],
    availableOffline: true
  },
  {
    id: 'py-03-conditionals',
    courseId: 'python-fundamentals',
    order: 3,
    title: '03. Conditional Statements',
    shortDescription: 'Make decisions in your code using if, elif, and else blocks.',
    contentMarkdown: `
# Conditional Statements

Conditional statements allow your program to execute different code blocks depending on whether a condition is True or False.

### Syntax:
\`\`\`python
if condition:
    # Code block 1
elif another_condition:
    # Code block 2
else:
    # Fallback block
\`\`\`
`,
    codeSnippets: [
      {
        title: 'Grade Checker',
        code: `marks = 78\n\nif marks >= 90:\n    print("Grade A+")\nelif marks >= 75:\n    print("Grade A")\nelif marks >= 50:\n    print("Grade B")\nelse:\n    print("Needs Revision")`,
        output: `Grade A`
      }
    ],
    keyPoints: [
      'Indentation is mandatory after if/elif/else statements.',
      'Comparison operators: ==, !=, >, <, >=, <=',
      'Logical operators: and, or, not'
    ],
    topicTags: ['conditions', 'control-flow'],
    availableOffline: true
  },
  {
    id: 'py-04-loops',
    courseId: 'python-fundamentals',
    order: 4,
    title: '04. Loops & Nested Loops',
    shortDescription: 'Repeat actions efficiently with for loops, while loops, and nested loop iterations.',
    contentMarkdown: `
# Loops in Python

A loop allows a program to repeatedly execute a block of code multiple times without rewriting lines.

### 1. For Loop with range()
The \`for\` loop iterates over a sequence of numbers generated by \`range(start, stop, step)\`.

\`\`\`python
for i in range(5):
    print(i)
\`\`\`
Output: 0, 1, 2, 3, 4

---

### 2. Nested Loops (Loop inside a Loop)
A **nested loop** is a loop placed inside the body of another loop.

- The **outer loop** controls the primary iteration.
- For **each single step** of the outer loop, the **inner loop completes all of its iterations**.

#### Detailed Example:
Suppose outer loop runs 3 times (i = 0, 1, 2) and inner loop runs 2 times (j = 0, 1).
Total iterations = 3 × 2 = 6 times!
`,
    codeSnippets: [
      {
        title: 'Nested Loop Matrix Demonstration',
        code: `# Outer loop runs 3 times
for i in range(3):
    # Inner loop runs 2 times for every outer loop step
    for j in range(2):
        print(f"Outer i={i}, Inner j={j}")`,
        output: `Outer i=0, Inner j=0\nOuter i=0, Inner j=1\nOuter i=1, Inner j=0\nOuter i=1, Inner j=1\nOuter i=2, Inner j=0\nOuter i=2, Inner j=1`
      },
      {
        title: 'Printing a Star Pattern with Nested Loops',
        code: `rows = 4\nfor i in range(1, rows + 1):\n    for j in range(i):\n        print("*", end=" ")\n    print()`,
        output: `*\n* *\n* * *\n* * * *`
      }
    ],
    keyPoints: [
      'For loops are best when number of iterations is known.',
      'While loops repeat as long as condition remains True.',
      'In nested loops, total iterations = outer_iterations × inner_iterations.',
      'break exits the loop immediately; continue skips to next iteration.'
    ],
    topicTags: ['loops', 'nested-loops'],
    availableOffline: true
  },
  {
    id: 'py-05-functions',
    courseId: 'python-fundamentals',
    order: 5,
    title: '05. Functions & Reusability',
    shortDescription: 'Write reusable blocks of code using def, parameters, and return values.',
    contentMarkdown: `
# Functions in Python

A function is a reusable block of organized code that performs a specific task. Functions make code modular, readable, and easy to test.

### Defining a Function
Use the \`def\` keyword followed by function name and parentheses.
`,
    codeSnippets: [
      {
        title: 'Greeting & Calculation Functions',
        code: `def calculate_scholarship(gpa, income):\n    if gpa >= 8.0 and income <= 250000:\n        return "Eligible for 100% Scholarship"\n    elif gpa >= 7.0:\n        return "Eligible for 50% Scholarship"\n    return "Standard Grants Apply"\n\nprint(calculate_scholarship(8.4, 180000))`,
        output: `Eligible for 100% Scholarship`
      }
    ],
    keyPoints: [
      'Functions are declared with def function_name():',
      'Parameters pass inputs into the function.',
      'return statement sends back result to caller.'
    ],
    topicTags: ['functions', 'modular-code'],
    availableOffline: true
  },
  {
    id: 'py-06-lists',
    courseId: 'python-fundamentals',
    order: 6,
    title: '06. Lists & Dictionaries',
    shortDescription: 'Store collection of items and key-value pairs efficiently in Python.',
    contentMarkdown: `
# Data Structures: Lists & Dictionaries

### Lists
A list is an ordered, mutable collection of elements enclosed in square brackets \`[]\`.

### Dictionaries
A dictionary stores data in key-value pairs enclosed in curly braces \`{}\`.
`,
    codeSnippets: [
      {
        title: 'Working with Lists & Dictionaries',
        code: `# List of subjects\nsubjects = ["Python", "Web Dev", "DBMS"]\nsubjects.append("Mathematics")\n\n# Dictionary of Student Profile\nstudent = {\n    "name": "Rahul",\n    "course": "BCA",\n    "semester": 1\n}\n\nprint("First subject:", subjects[0])\nprint("Student Name:", student["name"])`,
        output: `First subject: Python\nStudent Name: Rahul`
      }
    ],
    keyPoints: [
      'Lists are indexed starting at 0.',
      'List methods: .append(), .remove(), .pop(), len().',
      'Dictionaries access values using keys: dict[key].'
    ],
    topicTags: ['lists', 'dictionaries', 'data-structures'],
    availableOffline: true
  }
];

export const PYTHON_LOOP_QUIZ_QUESTIONS: QuizQuestionRecord[] = [
  {
    id: 'q-py-loop-1',
    courseId: 'python-fundamentals',
    lessonId: 'py-04-loops',
    topicTag: 'loops',
    question: 'What is the output of range(5) when converted to a list or iterated in a for loop?',
    options: [
      '1, 2, 3, 4, 5',
      '0, 1, 2, 3, 4',
      '0, 1, 2, 3, 4, 5',
      '1, 2, 3, 4'
    ],
    correctOptionIndex: 1,
    explanation: 'range(5) generates numbers from 0 up to (but excluding) 5, so 0, 1, 2, 3, 4.'
  },
  {
    id: 'q-py-loop-2',
    courseId: 'python-fundamentals',
    lessonId: 'py-04-loops',
    topicTag: 'nested-loops',
    question: 'How many total times will the print statement execute in this nested loop?\n\nfor i in range(3):\n    for j in range(4):\n        print(i, j)',
    options: [
      '7 times',
      '12 times',
      '3 times',
      '4 times'
    ],
    correctOptionIndex: 1,
    explanation: 'The outer loop runs 3 times. For each outer iteration, the inner loop runs 4 times. Total = 3 × 4 = 12 times.'
  },
  {
    id: 'q-py-loop-3',
    courseId: 'python-fundamentals',
    lessonId: 'py-04-loops',
    topicTag: 'nested-loops',
    question: 'In a nested loop structure, which loop completes ALL its iterations first during a single iteration of the outer loop?',
    options: [
      'The Outer Loop',
      'The Inner Loop',
      'Both loops run simultaneously',
      'Neither loop finishes'
    ],
    correctOptionIndex: 1,
    explanation: 'The inner loop runs to completion from start to finish for every single iteration step of the outer loop.'
  },
  {
    id: 'q-py-loop-4',
    courseId: 'python-fundamentals',
    lessonId: 'py-04-loops',
    topicTag: 'loops',
    question: 'Which statement is used to skip the rest of the current loop iteration and move directly to the next one?',
    options: [
      'break',
      'exit',
      'continue',
      'pass'
    ],
    correctOptionIndex: 2,
    explanation: 'continue skips the remaining instructions inside the loop body for the current cycle and proceeds to the next iteration.'
  },
  {
    id: 'q-py-loop-5',
    courseId: 'python-fundamentals',
    lessonId: 'py-04-loops',
    topicTag: 'nested-loops',
    question: 'What will be printed by the following code snippet?\n\nfor i in range(2):\n    for j in range(2):\n        if i == j:\n            print(1, end=" ")\n        else:\n            print(0, end=" ")',
    options: [
      '1 0 0 1',
      '0 1 1 0',
      '1 1 0 0',
      '0 0 1 1'
    ],
    correctOptionIndex: 0,
    explanation: 'When i=0, j=0 (matches -> 1); i=0, j=1 (diff -> 0); i=1, j=0 (diff -> 0); i=1, j=1 (matches -> 1). Output is "1 0 0 1".'
  }
];
