# @author Edwin Young
import sys
import win32print
hPrinter = win32print.OpenPrinter(sys.argv[1] if len(sys.argv) > 1 else win32print.GetDefaultPrinter())
try:
    win32print.StartDocPrinter(hPrinter, 1, ("open_case", None, "RAW"))
    try:
        win32print.StartPagePrinter(hPrinter)
        win32print.WritePrinter (hPrinter, chr(27) + 'p' + chr(0) + chr(60) + chr(255))
        win32print.EndPagePrinter (hPrinter)
    finally:
        win32print.EndDocPrinter (hPrinter)
finally:
    win32print.ClosePrinter (hPrinter)