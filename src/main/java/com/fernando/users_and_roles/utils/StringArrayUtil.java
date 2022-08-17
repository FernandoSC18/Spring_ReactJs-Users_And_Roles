package com.fernando.users_and_roles.utils;

import java.util.Arrays;
import java.util.HashSet; 

public class StringArrayUtil {


    public static String stringArrayToString (String [] array, boolean deleteSpaces){
        if (array == null || array.length <= 0) return "";

        HashSet hashSet = new HashSet<String>(Arrays.asList( array ));
        String textArray = deleteSpaces ? hashSet.toString().replace(" ","") : hashSet.toString();
		return textArray.substring(1, textArray.length()-1); 
    }

    
    public static Long[] stringToLongArray (String textArray, String delimiter ){
        Long [] result = new Long[0]; 
        if (textArray == null || textArray.isEmpty() ) return result;
        String[] values = textArray.split(delimiter);

        result = new Long [values.length];
        for (int i = 0; i < values.length; i++)
            result[i] = Long.parseLong(values[i]);

        return result;
    }
    
}
