// import {
//   faChevronLeft,
//   faChevronRight
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  cloneElement,
  createRef,
  ReactElement,
  useEffect,
  useState
} from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './Table.module.scss';

export type TableRow<T = any> = T;
export type TableColumn<T = any> = {
  display: string;
  property: string;
  styles?: { [key: string]: any };
  transformer?: (row: TableRow<T>) => any;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: TableRow<T>[];
  expandableContent?: (row: TableRow<T>, rowIndex: number) => ReactElement;
  actionsColumn?: (row: TableRow<T>, rowIndex: number) => ReactElement;
  emptyMessage?: string;
  rowsPerPage?: number;
  onRowExpanded?: (row: TableRow<T>, rowIndex: number) => void;
};

export const Table = <T,>({
  columns,
  data,
  expandableContent,
  actionsColumn,
  emptyMessage,
  rowsPerPage = 50,
  onRowExpanded
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedRows, setDisplayedRows] = useState<TableRow<T>[]>();
  const [expandedRows, setExpandedRows] = useState({});
  const [expandableContentRefs, setExpandableContentRefs] = useState({});

  useEffect(() => {
    if (!displayedRows || !displayedRows.length) {
      setExpandableContentRefs({});
      return;
    }
    const refs = {};
    displayedRows.forEach((row, i) => {
      refs[i] = createRef();
    });
    setExpandableContentRefs(refs);
  }, [displayedRows]);

  useEffect(() => {
    if (!data || !data.length) {
      setCurrentPage(0);
      return;
    }
    setCurrentPage(1);
  }, [data]);

  useEffect(() => {
    if (!data || !data.length) {
      setTotalPages(0);
      return;
    }
    if (data.length <= rowsPerPage) {
      setTotalPages(1);
      return;
    }
    setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data]);

  useEffect(() => {
    setExpandedRows({});
  }, [data, currentPage]);

  useEffect(() => {
    if (!data || !data.length) {
      setDisplayedRows([]);
    }
    const start = rowsPerPage * currentPage - rowsPerPage;
    const end = rowsPerPage * currentPage;
    const displayedRows = data?.slice(start, end);
    setDisplayedRows(displayedRows);
  }, [totalPages, currentPage, data]);

  const toggleRow = (rowIndex) => {
    const shouldExpand = !expandedRows[rowIndex];
    if (shouldExpand) {
      onRowExpanded && onRowExpanded(displayedRows[rowIndex], rowIndex);
    }
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [rowIndex]: shouldExpand
    }));
  };

  const getRowsRange = () => {
    if (!currentPage) {
      return '';
    }
    const start = currentPage * rowsPerPage - rowsPerPage + 1;
    const end =
      currentPage * rowsPerPage > data?.length
        ? data?.length
        : currentPage * rowsPerPage;
    return `${start} - ${end} of ${data?.length}`;
  };

  if (!data) {
    return (
      <div className='min-h-[250px] flex items-center justify-center border-2 border-secondary'>
        <LoadingSpinner size='lg' color='secondary' />
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className='min-h-[250px] flex items-center justify-center border-2 border-secondary'>
        {emptyMessage || 'No data to display'}
      </div>
    );
  }
  return (
    <div className='border-2 border-secondary'>
      <div className='rounded-sm min-h-[250px]'>
        <div
          className='flex items-center border-b-2 border-secondary bg-white text-primary'
          style={!!expandableContent ? { paddingLeft: '0px' } : {}}
        >
          {expandableContent && (
            <span className={styles.table_arrow_wrap}></span>
          )}
          {columns.map((column) => (
            <div
              key={column.display}
              className='flex-1 font-bold p-2'
              style={column.styles || {}}
            >
              {column.display}
            </div>
          ))}
          {!!actionsColumn && <div>Actions</div>}
        </div>
        {(displayedRows || []).map((row, i) => (
          <div
            key={JSON.stringify(row)}
            className='border-b-1 border-secondary'
            onClick={() => toggleRow(i)}
          >
            <div
              className='flex items-center'
              style={
                !!expandableContent
                  ? { paddingLeft: '0px', cursor: 'pointer' }
                  : {}
              }
            >
              {expandableContent && (
                <span className={styles.table_arrow_wrap}>
                  <span
                    className='table_arrow'
                    style={{
                      transform: expandedRows[i] ? 'rotate(90deg)' : 'none'
                    }}
                  >
                    {/* <FontAwesomeIcon icon={faChevronRight} color='#f3901d' /> */}
                  </span>
                </span>
              )}
              {columns.map((column) => (
                <div key={column.display} className='flex-1 text-lg p-2'>
                  {(column.transformer
                    ? column.transformer(row)
                    : row[column.property]) || '--'}
                </div>
              ))}
              {!!actionsColumn && (
                <div className={styles.actions_column}>
                  {cloneElement(actionsColumn(row, i))}
                </div>
              )}
            </div>
            {!!expandableContent && (
              <div
                className={styles.table_expandable_content}
                style={{
                  height: expandedRows[i]
                    ? expandableContentRefs[i].current.offsetHeight + 'px'
                    : '0px'
                }}
              >
                {cloneElement(expandableContent(row, i), {
                  ref: expandableContentRefs[i]
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='border-t-2 border-secondary'>
        <div className='p-2 flex justify-between items-center mr-4'>
          <div className={styles.current_rows_wrap}>
            <p>{getRowsRange()}</p>
          </div>
          <div className='flex items-center'>
            <span
              className={`${
                currentPage <= 1 ? 'disabled' : ''
              } inline-block cursor-pointer`}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              {/* <FontAwesomeIcon icon={faChevronLeft} color='#00788a' /> */}
            </span>
            Page
            <input
              className='w-12 border-1 border-secondary bg-transparent outline-none text-center rounded-sm mx-2'
              type='text'
              value={currentPage}
              onChange={(e) => {
                if (!e.target.value) {
                  setCurrentPage(1);
                  return;
                }
                if (!isNaN(+e.target.value)) {
                  const page =
                    +e.target.value > totalPages
                      ? totalPages
                      : +e.target.value <= 0
                      ? 1
                      : Math.round(+e.target.value);

                  setCurrentPage(page);
                }
              }}
            />
            of {totalPages}
            <span
              className={`${
                currentPage >= totalPages ? 'disabled' : ''
              } inline-block cursor-pointer`}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              {/* <FontAwesomeIcon
              icon={faChevronRight}
              color='#00788a'
              style={{ marginLeft: '0.5rem' }}
            /> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
