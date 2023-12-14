import { createContext, useState } from "react"
import Filters from "../models/Filters"

type Props = {
    children: React.ReactNode
}

type FiltersContextValue = {
    filters: Filters | null,
    setFilters: (filters: Filters | null) => void
}

export const FiltersContext = createContext<FiltersContextValue>({
    filters: null,
    setFilters: () => {}
});

const FiltersContextProvider: React.FC<Props> = ({ children }) => {
    const [filters, setFilters] = useState<Filters | null>(null);

    function setFiltersHandler(filters: Filters | null) {
        setFilters(filters);
    }

    const contextValue: FiltersContextValue = {
        filters: filters,
        setFilters: setFiltersHandler
    };

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    );
}

export default FiltersContextProvider;