import styled from "styled-components";
import { useHeroes } from "../../context/HeroContext";
import Image from 'next/image'
import agiIcon from '../../../public/hero_agility.png'
import strIcon from '../../../public/hero_strength.png'
import intIcon from '../../../public/hero_intelligence.png'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 60px;
`

const ImageBox = styled.div`
  width: 225px;
  height: 127px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    transition: width 0.45s, height 0.45s
  }

  div.overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 100%;
      left: 0;
      background-image: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7035189075630253) 100%);
      transition: top 0.45s;
    }

  :hover {
    img {
      width: 110%;
      height: 110%;
      }
    div.overlay {
      top: 0;
    }
  }
`

const HeroInfo = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  bottom: 0;
  padding: 4px;
  pointer-events: none;

  span{
    color: #FFFFFF;
    font-size: 25px;
    margin-left: 10px;
    }
`

const HeroContainer = styled.div`
  position: relative;
  width: 225px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 10px;
  cursor: pointer;

  :hover {
    ${HeroInfo} {
      display: flex;
    }
  }
`
type HeroesProps = {
  inputText: string;
  selected: string;
}

export default function Heroes({ inputText, selected }: HeroesProps) {
  const { heroes } = useHeroes();

  return (
    <FlexContainer>
      {heroes
        .filter((hero) => {
          if (inputText === '') return hero;
          return hero.localized_name.toLowerCase().includes(inputText.toLowerCase())
        })
        .filter((hero) => {
          if (selected === '') return hero;
          return hero.primary_attr === selected
        })
        .map(hero =>
        (
          <HeroContainer key={hero.id}>
            <ImageBox>
              <Image src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.slice(14)}.png`} width="225px" height="127px" alt={hero.localized_name} />
              <div className="overlay" />
            </ImageBox>
            <HeroInfo>
              {hero.primary_attr == 'agi' && <Image src={agiIcon} width="25px" height="25px" alt="agi" />}
              {hero.primary_attr == 'str' && <Image src={strIcon} width="25px" height="25px" alt="str" />}
              {hero.primary_attr == 'int' && <Image src={intIcon} width="25px" height="25px" alt="int" />}
              <span>{hero.localized_name}</span>
            </HeroInfo>
          </HeroContainer>
        ))}
    </FlexContainer>
  )
}