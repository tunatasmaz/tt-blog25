-- Önce mevcut bucket'ı temizle
drop policy if exists "Images are publicly accessible" on storage.objects;
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Authenticated users can update their images" on storage.objects;
drop policy if exists "Authenticated users can delete their images" on storage.objects;
drop policy if exists "Article images are publicly accessible" on storage.objects;
drop policy if exists "Organize articles in folders" on storage.objects;

delete from storage.buckets where id = 'article-images';

-- Bucket'ı yeniden oluştur
insert into storage.buckets (id, name, public)
values ('article-images', 'Article Images', true);

-- Basit politikalar ekle
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'article-images' );

create policy "Auth Insert"
on storage.objects for insert
with check (
  bucket_id = 'article-images'
  and auth.role() = 'authenticated'
);
