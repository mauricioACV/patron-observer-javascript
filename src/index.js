class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(o) {
    this.observers.push(o);
  }

  unsubscribe(o) {
    this.observers = this.observers.filter((obs) => obs !== o);
  }

  notify(model) {
    this.observers.forEach((observer) => {
      observer.notify(model);
    });
  }
}

class TextSubject extends Subject {
  constructor() {
    super();
    this.text = "";
  }

  notify(text) {
    this.text = text;
    super.notify(this);
  }
}

class Div1Observer {
  notify(subject) {
    document.getElementById("div1").innerHTML = subject.text;
  }
}

class Div2Observer {
  notify(subject) {
    document.getElementById("div2").innerHTML = subject.text.length;
  }
}

class Div3Observer {
  notify(subject) {
    if (subject.text.search("bicicleta") > 0) {
      document.getElementById("div3").innerHTML = "a pedalear!";
    } else {
      document.getElementById("div3").innerHTML = ";(";
    }
  }
}

let textSubject = new TextSubject();
let miDiv1 = new Div1Observer();
let miDiv2 = new Div2Observer();
let miDiv3 = new Div3Observer();

textSubject.subscribe(miDiv1);
textSubject.subscribe(miDiv2);
textSubject.subscribe(miDiv3);

document.getElementById("mitexto").addEventListener("input", (e) => {
  textSubject.notify(e.target.value);
});
