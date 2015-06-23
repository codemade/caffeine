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

<img src='img/why_face_meme.jpg' style='border:none;height:300px' />

<span style='color:#f1c40f;font-size:150%;font-weight:bold;font-style:italic'>
  Yet another javascript framework?
</span>

---

#What is React?

<img src='img/stahp.jpg' style='border:none;' />

---

#This is React!

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

<br />
<br />
##<span style='color:#9b59b6'>React only handles the <span style='font-size:200%'>UI</span></span>

---

#This is React!

<br />
<br />
##<span style='color:#f1c40f'>The <span style='font-size:200%'>V</span> in MVC</span>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
    </td>
  </tr>
</table>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
      ... 2-way-data-binding ?<br />
    </td>
  </tr>
</table>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
      ... 2-way-data-binding ?<br />
      ... MVC ?<br />
    </td>
  </tr>
</table>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
      ... 2-way-data-binding ?<br />
      ... MVC ?<br />
      ... MVVM ?<br />
    </td>
  </tr>
</table>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
      ... 2-way-data-binding ?<br />
      ... MVC ?<br />
      ... MVVM ?<br />
      ... Templates ?<br />
    </td>
  </tr>
</table>

---

#<span style='color:#3498db'>What about...</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/seriously.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      ... Single Page Applications ?<br />
      ... 2-way-data-binding ?<br />
      ... MVC ?<br />
      ... MVVM ?<br />
      ... Templates ?<br />
      ... Routes ?<br />
    </td>
  </tr>
</table>

---

<br />
<br />
#<span style='color:#e74c3c;font-size:300%;'>Wait!</span>

---

<br />
##In React there is no

<br />
#<span style='color:#f1c40f'>Controller</span>

---

<br />
##In React there is no

<br />
#<span style='color:#f1c40f'>Model</span>

---

<br />
##In React there is no

<br />
#<span style='color:#f1c40f'>Data Binding</span>

---

<br />
##In React there is no

<br />
#<span style='color:#f1c40f'>$root-parent-scope</span>

---

<br />
##In React there are just

<br />
#<span style='color:#2ecc71'>#Components</span>

---

<img src='img/all-the-things.png' style='border:none;' />
#<span style='color:#f1c40f'>#Everything</span> <span style='color:#e74c3c'>#is</span>
#<span style='color:#27ae60'>#a</span> <span style='color:#2b85c1'>#Component</span>

---

#<span style='color:#1abc9c'>Components are</span>

<table style='width:100%'>
  <tr>
    <td style='vertical-align:top;text-align:right;'>
      <img src='img/thinking.png' style='border:none;background:white;display:inline' />
    </td>
    <td style='vertical-align:top;text-align:left;'>
      Componsable<br />
      Reusable<br />
      Testable<br />
    </td>
  </tr>
</table>
