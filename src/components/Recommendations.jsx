import cover1 from '../assets/images/our_missing_hearts.png'

export default function Recommendations() {
  return (
    <section className='relative flex w-full h-full items-center'>
      <div className='flex justify-center items-center h-full w-2/5'>
        <img src={cover1} alt="" className='w-full h-full object-contain' />
      </div>
    </section>
  );
}
