import {FC, useCallback, useEffect, useState} from 'react';

import css from "../MoviesContainer/Movies.module.css";
interface IProps {
    setQuery:Function,
    totalPages:number,
    page:string
}

const Pagination: FC<IProps> = ({page,totalPages,setQuery}) => {
    const [pages, setPages] = useState<number[]>([]);
    const [activePage, setActivePage] = useState<number>(+page-1);

    const buildPages = useCallback(()=>{
       const newPages = [];

       if (totalPages <= 5){
           for (let i = 0; i < totalPages; i++) {
               newPages.push(i)
           }
       }else {
           const maxVisiblePages = 5;
           let start = Math.max(0,Math.min(totalPages - maxVisiblePages, activePage - Math.floor((maxVisiblePages/2))));
           let end;
           
           if (activePage === totalPages-maxVisiblePages){
               end = (start + maxVisiblePages) + 1;
           }else {
               end = start + maxVisiblePages
           }

           for (let i = start; i < end; i++) {
              newPages.push(i);
           }
       }
       
       setPages(newPages);
    },[activePage,totalPages]);

    useEffect(() => {
        setActivePage(+`${+page - 1}`);
    }, [page]);

    useEffect(() => {
        buildPages();
    }, [activePage, buildPages]);

    const isActive = (page:number)=>(activePage === page ? `${css.ActiveButton}` : `${css.Button}`);

    const previousPage = ()=>{
        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=>{
            prev.set('page',`${+page-1}`);
            return prev;
        })
    }

    const nextPage = ()=>{
        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=>{
            prev.set('page',`${+page+1}`);
            return prev;
        })
    }

    const changeQuery = (pageToGo:number)=>{
        setQuery((prev: { set: (arg0: string, arg1: string) => void; })=>{
            prev.set('page',`${pageToGo+1}`);
            return prev;
        })
    }

    return (
        <div className={css.Buttons}>
            <button onClick={previousPage} disabled={page === '1'} className={css.Button}>Back</button>

            <ul style={{padding:0}}>
                <>
                {pages[0] !== 0 && <button onClick={()=>changeQuery(0)} className={css.Button}>1</button>}
                {pages[0] > 1 && <button className={css.Button}>...</button>}

                {pages.map(page=>(
                    <button className={isActive(page)}
                    onClick={()=>changeQuery(page)}
                    key={page}>
                        {page + 1}</button>
                ))}

                {totalPages > 5 && activePage < totalPages - 5 && <button className={css.Button}>...</button>}

                {(totalPages > 5 && activePage < totalPages - 3) && (
                    <button className={isActive(totalPages-1)}
                            onClick={()=>changeQuery(totalPages-1)}>{totalPages}</button>
                )}
                </>
            </ul>

            <button onClick={nextPage} disabled={page === totalPages.toString()} className={css.Button}>Next</button>
        </div>
    );
};

export {Pagination};