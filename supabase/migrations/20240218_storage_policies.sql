-- Bucket oluştur (eğer yoksa)
insert into storage.buckets (id, name, public)
select 'article-images', 'article-images', true
where not exists (
    select 1 from storage.buckets where id = 'article-images'
);

-- Bucket ayarlarını güncelle
update storage.buckets 
set public = true,
    file_size_limit = 10485760, -- 10MB limit
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/gif', 'image/webp']
where id = 'article-images';

-- Mevcut politikaları temizle
drop policy if exists "Article images are publicly accessible" on storage.objects;
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Organize articles in folders" on storage.objects;

-- Yeni politikalar ekle
create policy "Images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'article-images' );

create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
    bucket_id = 'article-images' AND
    auth.role() = 'authenticated'
);

create policy "Authenticated users can update their images"
on storage.objects for update
using ( bucket_id = 'article-images' AND auth.role() = 'authenticated' );

create policy "Authenticated users can delete their images"
on storage.objects for delete
using ( bucket_id = 'article-images' AND auth.role() = 'authenticated' );
