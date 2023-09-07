export default function Home() {
  const data = [1,2,3,4,45,6,7,0]
  return (
    <div className="text-SystemGray4">
      main5
      {
        data.map(value => {
          return(
            <div key={value} className="py-[100px] bg-SystemBrand">
              {value}
            </div>
          )
        })
      }
    </div>
  )
}
