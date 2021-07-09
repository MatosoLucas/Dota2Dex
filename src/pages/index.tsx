import { useEffect, useRef, useState } from "react"
import Heroes from "./components/Heroes"
import Image from 'next/image'
import styled from 'styled-components'
import agiIcon from '../../public/hero_agility.png'
import strIcon from '../../public/hero_strength.png'
import intIcon from '../../public/hero_intelligence.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(90deg, rgba(0,39,68,0.5466561624649859) 0%, rgba(0,39,68,0.7763480392156863) 100%);
  align-items: center;
`

const SearchInput = styled.input`
  margin-top: 30px;
  height: 50px;
  width: 50%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #000000;
  text-align: center;
  font-size: 26px;

  ::placeholder {
   color: #000000;
  }
  
  :focus::placeholder {
  color: transparent;
  font-size: 26px;
  }
`

const ButtonContainer = styled.div`
  width: 180px;
  margin: 20px;
  display: flex; 
  justify-content: space-between;
  align-items: center;
`

const AttributeButton = styled.button<{ selected: string }>`
  width: 45px;
  height: 45px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 50%;
  ${props => props.selected === props.id ? 'border: 1px solid #000000;' : 'border: 1px solid transparent;'}
  
  :hover {
    cursor: pointer;
  }
  
`

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = useState<string>('');

  const handleSelect = (value: string) => {
    if ( value === selected) (
      setSelected('')
    )
    else setSelected(value)
  }

  return (
    <Container>
      <SearchInput placeholder="Search for a Hero" onChange={(e) => setInputText(e.target.value)} />
      <ButtonContainer>
        <AttributeButton selected={selected} id="str" onClick={() => handleSelect('str')}><Image src={strIcon} /></AttributeButton>
        <AttributeButton selected={selected} id="agi" onClick={() => handleSelect('agi')}><Image src={agiIcon} /></AttributeButton>
        <AttributeButton selected={selected} id="int" onClick={() => handleSelect('int')}><Image src={intIcon} /></AttributeButton>
      </ButtonContainer>
      <Heroes inputText={inputText} selected={selected}  />
    </Container>
  )
}
