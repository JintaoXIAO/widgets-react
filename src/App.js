import React, { useState } from 'react'
import Accordion from './Accordion'
import Dropdown from './Dropdown';
import Header from './Header';
import Route from './Route';
import Search from './Search'
import Translate from './Translate';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front framework'
  },
  {
    title: 'Why use react?',
    content: '....'
  },
  {
    title: 'How do you use it?',
    content: '....'
  }
]


const options = [
  {
    label: 'the color red',
    value: 'red'
  },
  {
    label: 'the color green',
    value: 'green'
  },
  {
    label: 'a shade of blue',
    value: 'blue'
  }
]

function App() {
  const [selected, setSelected] = useState(options[0])
  return (
    <div>
      <Header />
      <Route path='/'>
        <Accordion items={ items }/>
      </Route>
      <Route path='/list'>
        <Search />
      </Route>
      <Route path='/dropdown'>
        <Dropdown 
          label="select a color" 
          options={ options }
          selected={ selected }
          onSelectedChange={ setSelected }/>
      </Route>
    </div>
  );
}

export default App;
