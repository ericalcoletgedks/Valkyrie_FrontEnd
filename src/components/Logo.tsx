

export const Logo = ({dark} : {dark: boolean} ) => {
  return (
    <>
      {
        dark ?
          <img src="/Valkyrie_white2.png" alt="" className={`h-15 w-15 overflow-hidden`} />
          :
          <img src="/Valkyrie_black2.png" alt="" className={`h-15 w-15 overflow-hidden`} />
      }
    </>
  )
}
 