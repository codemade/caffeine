#React
<img src='/img/react-logo.png' style='border:none;height:300px' />

\- Eine Einführung -

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

Software-Developer @ [mserv.com](http://www.mserv.com)

<span style='font-size:50%'>JavaScript, Node/IO, CQRS, Event Sourcing, Event Storming</span>

---

#Was ist React?

---

#Was ist React?

<img src='img/why_face_meme.jpg' style='border:none;height:300px' />

<span style='color:#f1c40f;font-size:150%;font-weight:bold;font-style:italic'>Noch ein JavaScript-Framework?</span>

---

#Was ist React?

<br />
<img src='img/backbone.png' style='border:none;background:transparent' />

---

#Was ist React?

<br />
<img src='img/knockout.png' style='border:none;background:transparent' />

---

#Was ist React?

<img src='img/angular.png' style='border:none;background:transparent;height:300px' />

---

#Was ist React?

<br />
<img src='img/ember.png' style='border:none;background:transparent' />

---

#Was ist React?

<img src='img/meteor.png' style='border:none;background:transparent;' />

---

#Was ist React?

<br />
<img src='img/batman.png' style='border:none;background:white' />

---

#Was ist React?

<br />
<img src='img/laxar.svg' style='border:none;background:transparent' />

---

#Was ist React?

<img src='img/stahp.jpg' style='border:none;' />

---

#Was ist React?

<br />
<div style='color:#27ae60;font-size:200%;'>
  A JavaScript library for building user interfaces
</div>

---
#Was ist React?

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

<br />
<br />
#<span style='color:#f1c40f'>#Alles #ist #eine</span>
#<span style='color:#2b85c1'>#Komponente</span>
