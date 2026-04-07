const Filter = ({ searchTerm, handleSearchTerm }) => {
  return (
   <form onSubmit={(e) => e.preventDefault()}>
   <div> 
        search: <input value={searchTerm} onChange={handleSearchTerm} />   
    </div>
    <button type="onSubmit" onClick={handleSearchTerm}>Filter</button>
    </form>
  )
}   
export default Filter