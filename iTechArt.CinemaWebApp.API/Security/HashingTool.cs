using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace iTechArt.CinemaWebApp.API.Security
{
    public class HashingTool
    {
        public static string ComputeHash(string input)
        {
            using HashAlgorithm sha512Hash = SHA512.Create();

            byte[] encodedData = sha512Hash.ComputeHash(Encoding.Unicode.GetBytes(input));

            var stringBuilder = new StringBuilder();
            foreach (byte encodedByte in encodedData)
            {
                stringBuilder.Append(encodedByte.ToString("x2"));
            }

            return stringBuilder.ToString();
        }

        public static bool ValidateHash(string input, string hash)
        {
            string hashOfInput = ComputeHash(input);

            StringComparer stringComparer = StringComparer.OrdinalIgnoreCase;

            return stringComparer.Compare(hashOfInput, hash) == 0;
        }
    }
}
