import {useState,useEffect, useRef,useCallback} from 'react';
import {
  LegacyCard, LegacyTabs,DatePicker,
  Box,
  Select,Icon,
  Card,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  FormLayout,Popover,
  TextField,
  Button,
  Form,
  InlineGrid
} from "@shopify/polaris";
export default function DobCalendar() {
    function nodeContainsDescendant(rootNode, descendant) {
      if (rootNode === descendant) {
        return true;
      }
      let parent = descendant.parentNode;
      while (parent != null) {
        if (parent === rootNode) {
          return true;
        }
        parent = parent.parentNode;
      }
      return false;
    }
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [{ month, year }, setDate] = useState({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
    const formattedValue = selectedDate.toISOString().slice(0, 10);
    const datePickerRef = useRef(null);
    function isNodeWithinPopover(node) {
      return datePickerRef?.current
        ? nodeContainsDescendant(datePickerRef.current, node)
        : false;
    }
    function handleInputValueChange() {
      console.log("handleInputValueChange",formattedValue);
    }
    function handleOnClose({ relatedTarget }) {
      setVisible(false);
    }
    function handleMonthChange(month, year) {
      setDate({ month, year });
    }
    function handleDateSelection({ end: newSelectedDate }) {
      setSelectedDate(newSelectedDate);
      setVisible(false);
    }
    useEffect(() => {
      if (selectedDate) {
        setDate({
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear(),
        });
      }
    }, [selectedDate]);
    return (
     
          <Popover
            active={visible}
            autofocusTarget="none"
            preferredAlignment="left"
            fullWidth
            preferInputActivator={false}
            preferredPosition="below"
            preventCloseOnChildOverlayClick
            onClose={handleOnClose}
            activator={
              <TextField
              name="dob"
                role="combobox"
                label={"Start date"}
                // prefix={<Icon source={CalendarIcon} />}
                value={formattedValue}
                onFocus={() => setVisible(true)}
                onChange={handleInputValueChange}
                autoComplete="off"
              />
            }
          >
            <Card ref={datePickerRef}>
              <DatePicker
                month={month}
                year={year}
                selected={selectedDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
              />
            </Card>
          </Popover>
    )
  }