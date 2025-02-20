//search Header.jsx
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, Squares2X2Icon, FunnelIcon } from '@heroicons/react/24/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function SearchHeader({ setMobileFiltersOpen, sortOptions }) {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shop All</h1>
      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <MenuItem key={option.name}>
                  {({ active }) => (
                    <a
                      href={option.href}
                      className={classNames(
                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
          <span className="sr-only">View grid</span>
          <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
