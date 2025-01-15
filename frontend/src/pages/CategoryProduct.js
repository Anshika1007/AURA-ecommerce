
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import SearchCard from '../components/SearchCardProducts';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const URLSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = URLSearch.getAll('Category');

  // Initialize selectCategory with categories from URL
  const [selectCategory, setSelectCategory] = useState(
    urlCategoryListinArray.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );

  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListinArray);

  const[sortBy,setSortBy]=useState("")

  // Fetch product data based on selected categories
  const fetchData = async (categories) => {
    if (categories.length === 0) {
      setData([]); // Clear data if no categories selected
      return;
    }
    setLoading(true);
    console.log('Fetching data for categories:', categories);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: categories,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json();
      console.log('Data response:', dataResponse);
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Set an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;

    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Update URL and filter list when category selection changes
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .filter((categoryKeyName) => selectCategory[categoryKeyName]);

    if (JSON.stringify(arrayOfCategory) !== JSON.stringify(filterCategoryList)) {
      setFilterCategoryList(arrayOfCategory);

      // Update the URL with selected categories
      if (arrayOfCategory.length > 0) {
        const params = new URLSearchParams();
        arrayOfCategory.forEach((category) => {
          params.append('Category', category);
        });
        navigate(`?${params.toString()}`, { replace: true });
      } else {
        navigate('/product-Category', { replace: true }); // Reset URL when no categories are selected
      }
    }
  }, [selectCategory, filterCategoryList, navigate]);

  // Fetch products based on category filters (on initial load and filter change)
  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData(filterCategoryList);
    }
  }, [filterCategoryList]);

    const handleOnCHnageSortBy=(e)=>{
      const {value}=e.target
      setSortBy(value)

      if(value==='asc'){
        setData(preve=>preve.sort((a,b)=>a.SellingPrice-b.SellingPrice))
      }
      if(value==='dsc'){
        setData(preve=>preve.sort((a,b)=>b.SellingPrice-a.SellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className="container mx-auto p-4">
      {/* Desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left side: Category filters */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto">
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">Sort By</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" value={"asc"} onChange={handleOnCHnageSortBy} checked={sortBy==='asc'} />
                <label htmlFor="">Price-Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" value={"dsc"} onChange={handleOnCHnageSortBy} checked={sortBy==='dsc'} />
                <label htmlFor="">Price-High to Low</label>
              </div>
            </form>
          </div>

          {/* Category filter */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">Category</h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                    checked={selectCategory[categoryName?.value] || false}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side: Display products */}
        <div className='px-4'>
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
         <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] flex flex-col gap-1'>
         {data.length !== 0 && !loading && <SearchCard data={data} />}
         
          {loading && <p>Loading...</p>}
          {data.length === 0 && !loading && <p>No products found</p>}
         </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
