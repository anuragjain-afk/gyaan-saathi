import { db, AIHistoryRecord } from '../db/indexedDB';
import { syncManager } from './syncManager';

export interface AIServiceResponse {
  queryId: string;
  question: string;
  answer: string;
  hindiAnswer?: string;
  keyTakeaway?: string;
  codeExample?: string;
  status: 'pending' | 'completed';
  isOfflineQueued: boolean;
}

export class AIService {
  public async askQuestion(
    question: string,
    courseId: string = 'python-fundamentals',
    lessonId: string = 'py-04-loops'
  ): Promise<AIServiceResponse> {
    const queryId = `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Always generate answer locally — no backend required
    const fallback = generateLocalAnswer(question);

    const record: AIHistoryRecord = {
      queryId,
      question,
      courseId,
      lessonId,
      answer: fallback.answer,
      hindiAnswer: fallback.hindiAnswer,
      keyTakeaway: fallback.keyTakeaway,
      codeExample: fallback.codeExample,
      status: 'completed',
      createdAt: new Date().toISOString(),
      synced: true
    };

    await db.aiHistory.add(record);

    return {
      queryId,
      question,
      answer: fallback.answer,
      hindiAnswer: fallback.hindiAnswer,
      keyTakeaway: fallback.keyTakeaway,
      codeExample: fallback.codeExample,
      status: 'completed',
      isOfflineQueued: false
    };
  }

  public async getHistory(): Promise<AIHistoryRecord[]> {
    return await db.aiHistory.orderBy('id').reverse().toArray();
  }
}

function generateLocalAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes('nested loop') || q.includes('loop inside')) {
    return {
      answer: "A nested loop is a loop placed inside the body of another loop. For every single iteration of the outer loop, the inner loop executes completely from start to finish.",
      hindiAnswer: "नेस्टेड लूप (Nested Loop) का मतलब है एक लूप के अंदर दूसरा लूप होना। बाहरी (outer) लूप की हर एक साइकिल के लिए, अंदरूनी (inner) लूप अपनी पूरी गिनती पूरी करता है।",
      keyTakeaway: "Total Iterations = Outer Loop Iterations × Inner Loop Iterations.",
      codeExample: `for i in range(3):\n    for j in range(2):\n        print(f"Outer {i}, Inner {j}")`
    };
  }

  if (q.includes('variable') || q.includes('data type')) {
    return {
      answer: "A variable in Python is a named container used to store data values in memory. Python automatically determines the data type (e.g., int, str, float, bool) based on the assigned value.",
      hindiAnswer: "पायथन में वेरिएबल (Variable) मेमोरी में डेटा स्टोर करने का एक नाम वाला डिब्बा होता है। असाइन की गई वैल्यू के आधार पर पायथन अपने आप डेटा टाइप तय करता है।",
      keyTakeaway: "Variables are case-sensitive and do not require type declarations.",
      codeExample: `student_name = "Rahul"\nage = 19\ngpa = 8.4`
    };
  }

  if (q.includes('function') || q.includes('def')) {
    return {
      answer: "A function is a reusable block of code created using the `def` keyword that executes only when called. It can take parameters as input and return values.",
      hindiAnswer: "फ़ंक्शन (Function) कोड का एक पुन: उपयोग योग्य ब्लॉक है जिसे `def` कीवर्ड का उपयोग करके बनाया जाता है।",
      keyTakeaway: "Functions promote modularity and eliminate code duplication.",
      codeExample: `def greet(name):\n    return f"Namaste {name}!"\n\nprint(greet("Rahul"))`
    };
  }

  if (q.includes('list') || q.includes('array')) {
    return {
      answer: "A list in Python is an ordered, mutable collection that can hold multiple values of any type. Lists are defined with square brackets and support indexing, slicing, and a wide range of built-in methods.",
      hindiAnswer: "पायथन में लिस्ट (List) एक क्रमबद्ध और परिवर्तनीय संग्रह है जो किसी भी प्रकार के अनेक मान रख सकती है।",
      keyTakeaway: "Lists are zero-indexed — the first element is at index 0.",
      codeExample: `fruits = ["apple", "mango", "banana"]\nprint(fruits[0])  # apple\nfruits.append("guava")\nprint(len(fruits))  # 4`
    };
  }

  if (q.includes('if') || q.includes('condition') || q.includes('else')) {
    return {
      answer: "Conditional statements (if, elif, else) allow a program to make decisions based on whether a condition evaluates to True or False.",
      hindiAnswer: "कंडीशनल स्टेटमेंट (if, elif, else) प्रोग्राम को किसी शर्त के सच या झूठ होने के आधार पर निर्णय लेने देते हैं।",
      keyTakeaway: "Python uses indentation (not braces) to define code blocks inside conditions.",
      codeExample: `marks = 75\nif marks >= 90:\n    print("Excellent!")\nelif marks >= 60:\n    print("Good job!")\nelse:\n    print("Keep practicing!")`
    };
  }

  if (q.includes('class') || q.includes('object') || q.includes('oop')) {
    return {
      answer: "A class is a blueprint for creating objects. It bundles data (attributes) and behavior (methods) together. Objects are instances of a class.",
      hindiAnswer: "क्लास (Class) ऑब्जेक्ट बनाने का एक ब्लूप्रिंट है। यह डेटा (attributes) और व्यवहार (methods) को एक साथ रखता है।",
      keyTakeaway: "OOP helps organize complex code into reusable, maintainable structures.",
      codeExample: `class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def grade(self):\n        return "Pass" if self.marks >= 40 else "Fail"\n\ns = Student("Priya", 85)\nprint(s.grade())`
    };
  }

  return {
    answer: `Based on your Python Fundamentals course context: "${question}" relates to core programming concepts covered in the lessons. Review the relevant lesson to find detailed explanations and examples.`,
    hindiAnswer: `आपके पायथन फंडामेंटल्स कोर्स के आधार पर: "${question}" से संबंधित जानकारी पाठों में विस्तार से दी गई है। संबंधित पाठ की समीक्षा करें।`,
    keyTakeaway: "Review Python loops, variables, functions, and data structure lessons for complete details.",
    codeExample: `# General Python Example\nfor item in ["Logic", "Practice", "Success"]:\n    print("Step:", item)`
  };
}

export const aiService = new AIService();
