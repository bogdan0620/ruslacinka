"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowDownUp, BookOpen, Download, MessageCircle, RefreshCw, Copy, Check, Info } from "lucide-react"
import { Logo } from "@/components/logo"

// Словарь для конвертации
const cyrillicToLatin = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "ë",
  ж: "ž",
  з: "z",
  и: "i",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "č",
  ш: "š",
  щ: "ş",
  ъ: "'",
  ы: "ū",
  ь: "'",
  э: "ē",
  ю: "ü",
  я: "ä",
}

// Создаем обратный словарь для конвертации латиницы в кириллицу
const latinToCyrillic = Object.fromEntries(Object.entries(cyrillicToLatin).map(([key, value]) => [value, key]))

export default function Home() {
  const [cyrillicText, setCyrillicText] = useState("")
  const [latinText, setLatinText] = useState("")
  const [copiedCyrillic, setCopiedCyrillic] = useState(false)
  const [copiedLatin, setCopiedLatin] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Определение мобильного устройства
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Функция для конвертации из кириллицы в латиницу
  const convertToLatin = () => {
    let result = ""

    for (let i = 0; i < cyrillicText.length; i++) {
      const char = cyrillicText[i].toLowerCase()

      // Если текущий символ - мягкий или твердый знак
      if (char === "ь" || char === "ъ") {
        // Проверяем предыдущий символ в результате
        const prevChar = result.length > 0 ? result[result.length - 1].toLowerCase() : ""

        // Проверяем, находится ли знак в конце слова
        const isEnd = i === cyrillicText.length - 1

        // Если предыдущий символ - š, ş или č И это конец слова (НЕ перед гласной), пропускаем апостроф
        if ((prevChar === "š" || prevChar === "ş" || prevChar === "č") && isEnd) {
          continue
        }
      }

      if (cyrillicToLatin[char]) {
        // Если символ есть в словаре, используем его латинский эквивалент
        // Сохраняем регистр оригинального символа
        result += cyrillicText[i] === char ? cyrillicToLatin[char] : cyrillicToLatin[char].toUpperCase()
      } else {
        // Если символа нет в словаре, оставляем как есть
        result += cyrillicText[i]
      }
    }
    setLatinText(result)
  }

  // Функция для конвертации из латиницы в кириллицу
  const convertToCyrillic = () => {
    let result = ""
    for (let i = 0; i < latinText.length; i++) {
      const char = latinText[i].toLowerCase()
      if (latinToCyrillic[char]) {
        // Если символ есть в словаре, используем его кириллический эквивалент
        // Сохраняем регистр оригинального символа
        result += latinText[i] === char ? latinToCyrillic[char] : latinToCyrillic[char].toUpperCase()
      } else {
        // Если символа нет в словаре, оставляем как есть
        result += latinText[i]
      }
    }
    setCyrillicText(result)
  }

  // Функция для копирования текста
  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      {/* Шапка */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
        <section className="container mx-auto text-center py-16 px-6">
          <div className="flex justify-center items-center mb-6">
            <Logo size={64} className="mr-4" showLicenseInfo={true} rounded={true} />
            <h1 className="text-5xl font-bold tracking-tight">Sovremennaä russkaä lacinka</h1>
          </div>
          <p className="text-xl max-w-2xl mx-auto font-light">
            Упрощённая и логичная система записи русского языка латиницей. Создана для ситуаций, когда кириллица — не
            вариант.
          </p>
        </section>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-6">
        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Зачем?</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 relative h-64 w-full">
              <Logo size={300} className="mx-auto" />
              <div className="sr-only">
                Изображение предоставлено Wikimedia Commons в соответствии с лицензией Creative Commons
                Attribution-Share Alike 4.0 International. Оригинал:
                https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg
              </div>
            </div>
            <p className="md:w-2/3 text-gray-700 leading-relaxed">
              Sovremennaä Russkaä Lacinka (Современная русская латинка) — это дополнение к кириллице, созданное в
              2024–2025 годах. Она передаёт русский язык латиницей, сохраняя фонетическую точность и удобочитаемость. В
              отличие от стандартной транслитерации, система учитывает орфографию и диакритику, делая текст логичным и
              естественным.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Принципы</h2>
          </div>
          <ul className="list-none max-w-2xl space-y-3">
            {[
              "Чёткость и логичность: Sovremennaä Russkaä Lacinka исключает избыточные буквы и сложные комбинации, сохраняя точную фонетическую передачу речи. Каждое обозначение продумано так, чтобы быть интуитивно понятным и легко воспроизводимым",
              "Обязательное использование диакритики: Диакритические знаки играют ключевую роль в точности передачи звуков. Умлаут (¨) обозначает йотированность, макрон (¯) передаёт твёрдость звука, а гачек (ˇ) используется для шипящих. Эти знаки не являются факультативными и строго регламентированы в системе",
              "Функция апострофа: ' заменяет ъ и ь, передавая их функцию в зависимости от позиции в слове. Он необходим для сохранения естественного произношения и отражает традиционные правила русского письма",
              "Упрощение окончания возвратных глаголов: В возвратных глаголах сочетания тс и тьс заменяются на c, что делает написание более логичным и экономным (смотрится → smotrica, кажется → kažeca)",
              "Отсутствие мягкого знака после шипящих на конце слова: После всегда мягких согласных ш, щ, ч мягкий знак в конце слова не используется (мышь → mūš, ночь → noč)",
              "Гибкость и развитие: Sovremennaä Russkaä Lacinka — живой проект, который развивается на основе практического использования и обратной связи. Система остаётся открытой для адаптации и улучшений, сохраняя свои основные принципы и функциональность",
            ].map((principle, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white text-sm flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Остальной код остается без изменений */}
        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <ArrowDownUp className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Таблица соответствия</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {isMobile && (
              <div className="absolute -top-8 right-0 flex items-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1" />
                <span>Прокрутите таблицу вправо →</span>
              </div>
            )}

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Кириллица
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Латинка
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Кириллица
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Латинка
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Кириллица
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider w-1/6">
                      Латинка
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">А а</td>
                    <td className="px-6 py-4 whitespace-nowrap">A a</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">К к</td>
                    <td className="px-6 py-4 whitespace-nowrap">K k</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Х х</td>
                    <td className="px-6 py-4 whitespace-nowrap">H h</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Б б</td>
                    <td className="px-6 py-4 whitespace-nowrap">B b</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Л л</td>
                    <td className="px-6 py-4 whitespace-nowrap">L l</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ц ц</td>
                    <td className="px-6 py-4 whitespace-nowrap">C c</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">В в</td>
                    <td className="px-6 py-4 whitespace-nowrap">V v</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">М м</td>
                    <td className="px-6 py-4 whitespace-nowrap">M m</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ч ч</td>
                    <td className="px-6 py-4 whitespace-nowrap">Č č</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Г г</td>
                    <td className="px-6 py-4 whitespace-nowrap">G g</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Н н</td>
                    <td className="px-6 py-4 whitespace-nowrap">N n</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ш ш</td>
                    <td className="px-6 py-4 whitespace-nowrap">Š š</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Д д</td>
                    <td className="px-6 py-4 whitespace-nowrap">D d</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">О о</td>
                    <td className="px-6 py-4 whitespace-nowrap">O o</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Щ щ</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ş ş</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Е е</td>
                    <td className="px-6 py-4 whitespace-nowrap">E e</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">П п</td>
                    <td className="px-6 py-4 whitespace-nowrap">P p</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ъ ъ, Ь ь</td>
                    <td className="px-6 py-4 whitespace-nowrap">'</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ё ё</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ë ë</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Р р</td>
                    <td className="px-6 py-4 whitespace-nowrap">R r</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ы ы</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ū ū</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ж ж</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ž ž</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">С с</td>
                    <td className="px-6 py-4 whitespace-nowrap">S s</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Э э</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ē ē</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">З з</td>
                    <td className="px-6 py-4 whitespace-nowrap">Z z</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Т т</td>
                    <td className="px-6 py-4 whitespace-nowrap">T t</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ю ю</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ü ü</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">И и</td>
                    <td className="px-6 py-4 whitespace-nowrap">I i</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">У у</td>
                    <td className="px-6 py-4 whitespace-nowrap">U u</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Я я</td>
                    <td className="px-6 py-4 whitespace-nowrap">Ä ä</td>
                  </tr>
                  <tr className="hover:bg-teal-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Й й</td>
                    <td className="px-6 py-4 whitespace-nowrap">J j</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">Ф ф</td>
                    <td className="px-6 py-4 whitespace-nowrap">F f</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium"></td>
                    <td className="px-6 py-4 whitespace-nowrap"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <RefreshCw className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Конвертер</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-teal-500 rounded-full"></span>
                  Кириллица
                </h3>
                <button
                  onClick={() => copyToClipboard(cyrillicText, setCopiedCyrillic)}
                  className="text-gray-500 hover:text-teal-600 transition-colors p-1"
                  disabled={!cyrillicText}
                  title="Копировать текст"
                >
                  {copiedCyrillic ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                placeholder="Введите текст на кириллице..."
                value={cyrillicText}
                onChange={(e) => setCyrillicText(e.target.value)}
                className="min-h-[150px] border-gray-200 focus:border-teal-500 focus:ring-teal-500"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={convertToLatin}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  disabled={!cyrillicText}
                >
                  Конвертировать в латиницу
                </Button>
                <Button
                  onClick={() => setCyrillicText("")}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                  disabled={!cyrillicText}
                >
                  Очистить
                </Button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-teal-700 flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-teal-500 rounded-full"></span>
                  Латиница
                </h3>
                <button
                  onClick={() => copyToClipboard(latinText, setCopiedLatin)}
                  className="text-gray-500 hover:text-teal-600 transition-colors p-1"
                  disabled={!latinText}
                  title="Копировать текст"
                >
                  {copiedLatin ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                placeholder="Введите текст на латинице..."
                value={latinText}
                onChange={(e) => setLatinText(e.target.value)}
                className="min-h-[150px] border-gray-200 focus:border-teal-500 focus:ring-teal-500"
              />
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={convertToCyrillic}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                  disabled={!latinText}
                >
                  Конвертировать в кириллицу
                </Button>
                <Button
                  onClick={() => setLatinText("")}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                  disabled={!latinText}
                >
                  Очистить
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Примеры</h2>
          </div>
          <div className="grid gap-4 max-w-xl mx-auto">
            {[
              { cyrillic: "Подъезд", latin: "Pod'ezd" },
              { cyrillic: "Мысль", latin: "Mūsl'" },
              { cyrillic: "Лучший знакомый", latin: "Lučšij znakomūj" },
              { cyrillic: "Шью", latin: "Š'ü" },
              { cyrillic: "Объявление", latin: "Ob'ävlenie" },
              { cyrillic: "Счастье", latin: "Sčast'e" },
            ].map((example, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap md:flex-nowrap justify-between items-center"
              >
                <div className="font-medium w-full md:w-auto">{example.cyrillic}</div>
                <div className="text-gray-400 mx-4 hidden md:block">→</div>
                <div className="font-mono text-teal-600 w-full md:w-auto mt-2 md:mt-0">{example.latin}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100  p-2 rounded-full">
              <Download className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Файл раскладки</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center max-w-xl mx-auto">
            <p className="text-gray-600 mb-4">
              Файл раскладки доступен для скачивания. Нажмите на кнопку ниже и скачайте SRL.zip
            </p>
            <a
              href="https://drive.google.com/file/d/1GuClXg7L0QQ5obqAImlkv10masSYn221/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Скачать раскладку</Button>
            </a>
          </div>
        </section>

        <section className="py-12 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-2 rounded-full">
              <MessageCircle className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold">Обратная связь</h2>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center max-w-xl mx-auto">
            <p className="text-gray-600 mb-4">Есть идеи или предложения? Свяжитесь с нами:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://t.me/Angelas_balta_veliava"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                Telegram
              </a>
              <span className="text-gray-400">•</span>
              <div className="text-gray-400 italic">Ссылка на форум появится в ближайшее время</div>
            </div>
          </div>
        </section>
      </div>

      {/* Подвал */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 Sovremennaä russkaä lacinka. Все права защищены.</p>
          <div className="mt-2 text-xs text-gray-500">
            Логотип предоставлен Wikimedia Commons в соответствии с лицензией Creative Commons Attribution-Share Alike
            4.0 International.
            <a
              href="https://en.wikipedia.org/wiki/File:Uppercase_and_lowercase_A_with_diaeresis.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-gray-400 hover:text-gray-300 transition-colors"
            >
              Оригинал изображения
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
