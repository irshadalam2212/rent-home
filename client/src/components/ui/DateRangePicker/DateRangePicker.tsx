import React, { useEffect, useRef, useState } from 'react'
import {
    createStaticRanges,
    DateRangePicker as ReactDateRangePicker,
} from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import {
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns'
import moment from 'moment'
import { HiOutlineCalendar } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
// import { da, enUS } from 'date-fns/locale'

export interface IDate {
    startDate: Date
    endDate: Date
    key: string
}

const DateRangePicker: React.FC<{
    value: IDate
    onChange: (date: IDate) => void
}> = ({ value, onChange }) => {
    const { t } = useTranslation()
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    // const { currentLang: locale } = useLocaleStore((state) => state)
    // const currentLocale = locale === 'da' ? da : enUS

    // Handle change in date range
    const handleChange = (ranges: any) => {
        onChange(ranges.selection)
    }

    // Toggle calendar visibility
    const handleToggleCalendar = () => {
        setIsOpenCalendar((prev) => !prev)
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpenCalendar(false)
        }
    }

    useEffect(() => {
        if (isOpenCalendar) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpenCalendar])

    const customStaticRanges = createStaticRanges([
        {
            label: t('range.thisWeek'),
            range: () => ({
                startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
                endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
            }),
        },
        {
            label: t('range.lastWeek'),
            range: () => {
                const lastWeek = subWeeks(new Date(), 1)
                return {
                    startDate: startOfWeek(lastWeek, { weekStartsOn: 1 }),
                    endDate: endOfWeek(lastWeek, { weekStartsOn: 1 }),
                }
            },
        },
        {
            label: t('range.thisMonth'),
            range: () => ({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date()),
            }),
        },
        {
            label: t('range.lastMonth'),
            range: () => {
                const lastMonth = subMonths(new Date(), 1)
                return {
                    startDate: startOfMonth(lastMonth),
                    endDate: endOfMonth(lastMonth),
                }
            },
        },
        {
            label: t('range.last3Months'),
            range: () => ({
                startDate: addMonths(new Date(), -3),
                endDate: startOfDay(new Date()),
            }),
        },
        {
            label: t('range.last6Months'),
            range: () => ({
                startDate: addMonths(new Date(), -6),
                endDate: startOfDay(new Date()),
            }),
        },
    ])

    return (
        <div className="relative w-full md:w-fit" ref={containerRef}>
            <div
                className="flex items-center justify-between rounded-xl shadow border bg-white h-10  px-4 cursor-pointer gap-5 text-gray-700 font-semibold w-full "
                onClick={handleToggleCalendar}
            >
                <div className="whitespace-nowrap">{`${format(value.startDate, 'dd MMM yyyy')} ${t('dashboard.to')} ${format(
                    value.endDate,
                    'dd MMM yyyy',
                )}`}</div>
                {/* <div className="whitespace-nowrap">{`${format(value.startDate, 'dd MMM yyyy', { locale: currentLocale })} to ${format(
                    value.endDate,
                    'dd MMM yyyy',
                    { locale: currentLocale },
                )}`}</div> */}
                <HiOutlineCalendar />
            </div>
            {isOpenCalendar && (
                <div className="absolute right-0 top-10 z-40 pt-2 rounded-lg overflow-hidden shadow-lg">
                    <ReactDateRangePicker
                        // locale={currentLocale}
                        weekStartsOn={1}
                        rangeColors={['#2a85ff']}
                        onChange={handleChange}
                        ranges={[value]}
                        maxDate={moment().endOf('month').toDate()}
                        direction="horizontal"
                        staticRanges={customStaticRanges}
                        inputRanges={[]}
                    />
                </div>
            )}
        </div>
    )
}

export default DateRangePicker
