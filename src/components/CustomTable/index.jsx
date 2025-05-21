import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'
import { useState } from 'react'
function CustomTable({ data, columns })
{
  const [sorting, setSorting] = useState([])
  const table = useReactTable({
    data,
    columns,
    state:{ sorting },
    onSortingChange:setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <table
        style={{
          width: '100%',
          // maxWidth: 1000,
          borderCollapse: 'separate',
          borderSpacing: 0,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          overflow: 'hidden',
          margin: '24px 0'
        }}
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} style={{ background: '#f5f6fa' }}>
              {headerGroup.headers.map(header => {
                const isSorted = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      padding: '14px 16px',
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#222',
                      borderBottom: '2px solid #e0e0e0',
                      background: '#f5f6fa',
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      userSelect: 'none'
                    }}
                  >
                    <span style={{ display:'flex', alignItems:'center', gap:6, justifyContent:'center' }}>
                      <span>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                      {{
                        asc: '🔼',
                        desc: '🔽'
                      }[isSorted] ?? ''}
                    </span>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              style={{
                background: idx % 2 === 0 ? '#fafbfc' : '#fff',
                transition: 'background 0.2s'
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#f0f4ff')}
              onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#fafbfc' : '#fff')}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: 15,
                    color: '#333',
                    textAlign: 'center',
                    position:'relative'
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: '1px solid #e0e0e0',
            background: '#f5f6fa',
            cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
            color: '#333'
          }}
        >
                Trước
        </button>
        <span style={{ fontWeight: 500, color: '#555' }}>
                    Trang {table.getState().pagination.pageIndex + 1}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: '1px solid #e0e0e0',
            background: '#f5f6fa',
            cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
            color: '#333'
          }}
        >
                Sau
        </button>
      </div>
    </div>
  )
}

export default CustomTable