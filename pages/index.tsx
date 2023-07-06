import Heading from "@components/heading";
import Travel from '@/components/travel'

export default function Home() {
  return (
    <>
      <Heading>Travel & Food</Heading>
      <div className="travelComponent">
        <Travel />
      </div>
    </>
  )
}
