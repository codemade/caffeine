#React
<img src='/img/react-logo.png' style='border:none;height:300px' />

\- Introduction -

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

---

<img src='img/why_face_meme.jpg' style='border:none;height:300px' />

ember.js, angular.js, ...

Yet another framework?

---

<br />
#What is React?

---

<br />
#What is React?

<div style='color:#27ae60;font-size:200%;'>
  A JavaScript library
  for building user interfaces
</div>

---

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
#<span style='color:#f1c40f'>#Everything #is #a</span>
#<span style='color:#2b85c1'>#Component</span>
