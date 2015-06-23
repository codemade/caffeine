#React
<img src='/img/react-logo.png' style='border:none;height:300px' />

\- A brief introduction -

---

#About us
<table>
  <tr>
    <td style='text-align:center;'>
      <img src='img/revrng.png' style='width:240px' />
      <br />
      René Viering
      <div style='margin-top:-32px'>
        <img src='img/twitter-icon.svg' style='height:48px;border:none;background:transparent;position:relative;top:28px;' />
        [@rvrng](http://twitter.com/rvrng)
      </div>
    </td>
    <td style='text-align:center;'>
      <img src='img/chrkhl.png' style='width:240px' />
      <br />
      Christian Kühl
      <div style='margin-top:-32px'>
        <img src='img/twitter-icon.svg' style='height:48px;border:none;background:transparent;position:relative;top:28px;' />
        [@chrkhl](http://twitter.com/chrkhl)
      </div>
    </td>
  </tr>
</table>

Software-Developer

<span style='font-size:50%'>JavaScript, Node/IO, CQRS, Event Sourcing, Event Storming</span>

---

#What is React?

---

#What is React?

<img src='img/why_face_meme.jpg' style='border:none;height:300px' />

<span style='color:#f1c40f;font-size:150%;font-weight:bold;font-style:italic'>
  Yet another javascript framework?
</span>

---

#What is React?

<br />
<img src='img/backbone.png' style='border:none;background:transparent' />

---

#What is React?

<br />
<img src='img/knockout.png' style='border:none;background:transparent' />

---

#What is React?

<img src='img/angular.png' style='border:none;background:transparent;height:300px' />

---

#What is React?

<br />
<img src='img/ember.png' style='border:none;background:transparent' />

---

#What is React?

<img src='img/meteor.png' style='border:none;background:transparent;' />

---

#What is React?

<br />
<img src='img/batman.png' style='border:none;background:white' />

---

#What is React?

<br />
<img src='img/laxar.svg' style='border:none;background:transparent' />

---

#What is React?

<img src='img/stahp.jpg' style='border:none;' />

---

#What is React?

<br />
<div style='color:#27ae60;font-size:200%;'>
  A JavaScript library for building user interfaces
</div>

---

#This is React!

``` javascript
class SomeItem extends React.Component {
  handleClick(event) {
    // ...
  }

  render() {
        var text = 'Hi there!';
        return (
            <p onClick={this.handleClick}>
                <span>{text}</span>
            </p>
        );
    }
}
```

---

#This is React!

<div style='border:3px solid red;width:100%;height:140px;position:absolute;top:330px;z-index:10'></div>
``` javascript
class SomeItem extends React.Component {
  handleClick(event) {
    // ...
  }

  render() {
        var text = 'Hi there!';
        return (
            <p onClick={this.handleClick}>
                <span>{text}</span>
            </p>
        );
    }
}
```

##<span style='color:red'>WTF is this?!</span>

---

``` javascript
var text = 'Hi there!';
return (
    <p onClick={this.handleClick}>
        <span>{text}</span>
    </p>
);
```

---

<br />
<br />
#<span style='color:#f1c40f'>#Everything #is #a</span>
#<span style='color:#2b85c1'>#Component</span>
