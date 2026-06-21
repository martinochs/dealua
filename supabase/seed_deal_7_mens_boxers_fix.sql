-- Deal 7: Men's boxer shorts 4-pack — fix outbound affiliate link
-- Run in Supabase SQL Editor (paste this entire file, not the path).
-- Short Admitad link (clean ulp) + same-tab friendly redirect on site.

UPDATE public.deals
SET
  affiliate_url = 'https://rzekl.com/g/1e8d114494d66b47c30616525dc3e8/?ulp=https%3A%2F%2Fwww.aliexpress.com%2Fitem%2F32968499846.html',
  external_url = 'https://www.aliexpress.com/item/32968499846.html'
WHERE id = '44444444-4444-4444-4444-444444444507';
